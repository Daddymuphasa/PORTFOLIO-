/**
 * The paid AEI gateway (lib/aei/gateway.ts) end to end, in process:
 *   - unpaid calls get 402 + PAYMENT-REQUIRED with the right Celo USDC terms
 *   - bad audio is rejected before any payment is asked for
 *   - the web app's own x402 client (lib/aei/paidCall.ts) pays it, AEI runs on
 *     the sample WAV, and the settlement tx comes back in PAYMENT-RESPONSE
 *   - nothing is settled when the payment or the request is bad
 *
 * The facilitator is a local stand-in that checks the EIP-3009 signature and
 * returns a fake tx hash. The payer is a throwaway key made in memory. No
 * network, no chain, no funds.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { getAddress, verifyTypedData } from "viem";
import { decodePaymentRequiredHeader } from "@x402/core/http";
import type { FacilitatorClient } from "@x402/core/server";
import { createAeiGateway, gatewayConfigFromEnv, type AeiResponseBody } from "../lib/aei/gateway";
import { pickRequirement, runPaidCall } from "../lib/aei/paidCall";
import { PAPAGEDON_PAYEE, USDC_CELO } from "../lib/aei/config";

const WAV = new Uint8Array(readFileSync(new URL("./fixtures/kick-120bpm.wav", import.meta.url)));
const FAKE_TX = "0x" + "cd".repeat(32);
const URL_PATH = "/v1/aei/signals";

type Calls = { supported: number; verify: number; settle: number };

function fakeFacilitator(opts: { settleOk?: boolean; verifyReason?: string } = {}): FacilitatorClient & { calls: Calls } {
  const calls: Calls = { supported: 0, verify: 0, settle: 0 };
  const checkSig = async (payload: Parameters<FacilitatorClient["verify"]>[0], req: Parameters<FacilitatorClient["verify"]>[1]) => {
    const p = payload.payload as { signature: `0x${string}`; authorization: Record<string, string> };
    const a = p.authorization;
    const extra = req.extra as { name: string; version: string };
    const ok = await verifyTypedData({
      address: a.from as `0x${string}`,
      domain: { name: extra.name, version: extra.version, chainId: 42220, verifyingContract: getAddress(req.asset) },
      types: {
        TransferWithAuthorization: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "value", type: "uint256" },
          { name: "validAfter", type: "uint256" },
          { name: "validBefore", type: "uint256" },
          { name: "nonce", type: "bytes32" },
        ],
      },
      primaryType: "TransferWithAuthorization",
      message: { ...a, value: BigInt(a.value), validAfter: BigInt(a.validAfter), validBefore: BigInt(a.validBefore) } as never,
      signature: p.signature,
    });
    const terms = getAddress(a.to) === getAddress(req.payTo) && a.value === req.amount;
    return { ok: ok && terms, payer: a.from };
  };
  return {
    calls,
    async getSupported() {
      calls.supported++;
      return {
        kinds: [{ x402Version: 2, scheme: "exact", network: "eip155:42220" }],
        extensions: [],
        signers: { "eip155:42220": ["0x0d74D5Cefd2e7F24E623330ebE3d8D4cB45fFB48"] },
      };
    },
    async verify(payload, req) {
      calls.verify++;
      const { ok, payer } = await checkSig(payload, req);
      if (opts.verifyReason) return { isValid: false, invalidReason: opts.verifyReason, payer };
      return ok ? { isValid: true, payer } : { isValid: false, invalidReason: "invalid_exact_evm_payload_signature", payer };
    },
    async settle(payload, req) {
      calls.settle++;
      const { payer } = await checkSig(payload, req);
      if (opts.settleOk === false) {
        return { success: false, errorReason: "insufficient_funds", transaction: "", network: req.network, payer };
      }
      return { success: true, transaction: FAKE_TX, network: req.network, payer };
    },
  };
}

function gateway(opts: { settleOk?: boolean; verifyReason?: string } = {}) {
  const facilitator = fakeFacilitator(opts);
  const gw = createAeiGateway({ config: gatewayConfigFromEnv({}), facilitator });
  return { gw, facilitator };
}

const post = (body?: BodyInit, headers: Record<string, string> = {}) =>
  new Request(`https://www.papagedon.com${URL_PATH}`, { method: "POST", body, headers });
const wavForm = (bytes: Uint8Array = WAV) => {
  const fd = new FormData();
  fd.append("audio", new Blob([new Uint8Array(bytes)], { type: "audio/wav" }), "clip.wav");
  return fd;
};

test("defaults: 0.01 USDC on Celo mainnet to the PAPAGEDON wallet via the Celo facilitator", () => {
  const c = gatewayConfigFromEnv({});
  assert.equal(c.network, "celo");
  assert.equal(c.payTo, PAPAGEDON_PAYEE);
  assert.equal(c.priceUsd, "0.01");
  assert.equal(c.facilitatorUrl, "https://api.x402.celo.org");
  assert.equal(c.apiKey, "");
  assert.throws(() => gatewayConfigFromEnv({ AEI_PAY_TO: "0x123" }));
  assert.throws(() => gatewayConfigFromEnv({ AEI_PRICE_USDC: "-1" }));
});

test("no payment -> 402 with PAYMENT-REQUIRED for 0.01 USDC on eip155:42220 (USDT as the second option)", async () => {
  const { gw, facilitator } = gateway();
  const res = await gw.handleSignals(post(wavForm()));
  assert.equal(res.status, 402);
  const header = res.headers.get("PAYMENT-REQUIRED");
  assert.ok(header, "PAYMENT-REQUIRED header");
  const pr = decodePaymentRequiredHeader(header!);
  assert.equal(pr.x402Version, 2);
  assert.equal(pr.resource.url, `https://www.papagedon.com${URL_PATH}`);
  const [usdc, usdt] = pr.accepts;
  assert.deepEqual(
    { scheme: usdc.scheme, network: usdc.network, asset: usdc.asset, amount: usdc.amount, payTo: usdc.payTo, extra: usdc.extra },
    { scheme: "exact", network: "eip155:42220", asset: USDC_CELO, amount: "10000", payTo: PAPAGEDON_PAYEE, extra: { name: "USDC", version: "2" } },
  );
  assert.equal(usdt.asset, "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e");
  assert.deepEqual(usdt.extra, { name: "Tether USD", version: "1" });
  assert.equal(usdc.maxTimeoutSeconds, 300);
  // The web app's quote guard accepts exactly this offer.
  const picked = pickRequirement(pr);
  assert.ok("requirement" in picked && picked.requirement.asset === USDC_CELO);
  // CORS lets a browser on another origin read the quote.
  assert.match(res.headers.get("Access-Control-Expose-Headers") ?? "", /PAYMENT-REQUIRED/);
  assert.match(res.headers.get("Access-Control-Expose-Headers") ?? "", /PAYMENT-RESPONSE/);
  const body = await res.json();
  assert.equal(body.error, "payment_required");
  assert.equal(body.pricing.display, "0.01 USDC");
  assert.equal(facilitator.calls.verify + facilitator.calls.settle, 0);
});

test("an empty probe (no audio, no payment) also gets the 402 quote", async () => {
  const { gw } = gateway();
  const res = await gw.handleSignals(post());
  assert.equal(res.status, 402);
  assert.ok(res.headers.get("PAYMENT-REQUIRED"));
});

test("audio that can't be analysed is refused before any payment is asked for", async () => {
  const { gw, facilitator } = gateway();
  const mp3ish = new Uint8Array([0x49, 0x44, 0x33, 4, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6]);
  const notWav = await gw.handleSignals(post(wavForm(mp3ish)));
  assert.equal(notWav.status, 415);
  assert.equal(notWav.headers.get("PAYMENT-REQUIRED"), null);

  const header = WAV.slice(0, 44);
  new DataView(header.buffer).setUint32(40, 2205 * 2, true); // 0.1 s of audio
  const tiny = new Uint8Array(44 + 4410);
  tiny.set(header);
  const short = await gw.handleSignals(post(tiny, { "Content-Type": "audio/wav" }));
  assert.equal(short.status, 422);
  assert.equal((await short.json()).error, "audio_too_short");

  const huge = await gw.handleSignals(post(new Uint8Array(4_100_000), { "Content-Type": "audio/wav" }));
  assert.equal(huge.status, 413);
  assert.equal(facilitator.calls.verify + facilitator.calls.settle, 0);
});

test("without X402_API_KEY the gateway refuses to quote, so nobody signs a payment that can't settle", async () => {
  const gw = createAeiGateway({ config: gatewayConfigFromEnv({}) });
  const res = await gw.handleSignals(post(wavForm()));
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, "gateway_not_configured");
});

async function serve(handler: (r: Request) => Promise<Response>) {
  const server = http.createServer(async (req, res) => {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
    const request = new Request(`http://127.0.0.1${req.url}`, {
      method: req.method,
      headers,
      body: req.method === "GET" || req.method === "HEAD" ? undefined : Buffer.concat(chunks),
    });
    const out = await handler(request);
    res.writeHead(out.status, Object.fromEntries(out.headers.entries()));
    res.end(Buffer.from(await out.arrayBuffer()));
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  const url = `http://127.0.0.1:${(server.address() as AddressInfo).port}${URL_PATH}`;
  return { url, close: () => server.close() };
}

test("the web app's x402 client pays the gateway, AEI runs on the sample WAV, and the tx hash comes back", async () => {
  const { gw, facilitator } = gateway();
  const { url, close } = await serve(gw.handleSignals);
  const payer = privateKeyToAccount(generatePrivateKey());
  try {
    const result = await runPaidCall({ url, makeBody: () => wavForm(), signer: payer, onStep: () => undefined });
    assert.equal(result.httpStatus, 200);
    assert.equal(result.amountUsdc, "0.01");
    assert.equal(result.settled, true);
    assert.equal(result.transaction, FAKE_TX);
    assert.equal(getAddress(result.payer!), payer.address);
    assert.deepEqual(facilitator.calls, { supported: 1, verify: 1, settle: 1 });

    const body = result.body as AeiResponseBody;
    assert.equal(body.payment?.transaction, FAKE_TX);
    assert.equal(body.payment?.explorerUrl, `https://celoscan.io/tx/${FAKE_TX}`);
    assert.equal(body.receipt.price.amount, "10000");
    assert.equal(body.receipt.price.symbol, "USDC");
    assert.equal(body.receipt.agent.erc8004AgentId, "9882");
    assert.match(body.receipt.audioSha256, /^0x[0-9a-f]{64}$/);
    assert.ok(Math.abs(body.result.tempo.bpm - 120) < 3, `bpm=${body.result.tempo.bpm}`);
    assert.ok(body.result.tempo.beatCount >= 12 && body.result.tempo.beatCount <= 16);
    assert.ok(body.result.silence.segments.some((s) => s.start > 6.8 && s.end > 8.3), "trailing silence found");
    assert.equal(body.result.signals.timeline.at(-1)?.state, "Silence");
  } finally {
    close();
  }
});

test("same clip, same result: two paid calls return the same AEI hash", async () => {
  const { gw } = gateway();
  const { url, close } = await serve(gw.handleSignals);
  const payer = privateKeyToAccount(generatePrivateKey());
  try {
    const call = () => runPaidCall({ url, makeBody: () => wavForm(), signer: payer, onStep: () => undefined });
    const a = (await call()).body as AeiResponseBody;
    const b = (await call()).body as AeiResponseBody;
    assert.equal(a.receipt.resultSha256, b.receipt.resultSha256);
    assert.equal(a.receipt.audioSha256, b.receipt.audioSha256);
    assert.deepEqual(a.result, b.result);
    assert.notEqual(a.requestId, b.requestId);
  } finally {
    close();
  }
});

test("a failed settlement returns 402 with no AEI result", async () => {
  const { gw, facilitator } = gateway({ settleOk: false });
  const { url, close } = await serve(gw.handleSignals);
  try {
    const result = await runPaidCall({
      url,
      makeBody: () => wavForm(),
      signer: privateKeyToAccount(generatePrivateKey()),
      onStep: () => undefined,
    });
    assert.equal(result.httpStatus, 402);
    assert.equal(result.settled, false);
    assert.equal(facilitator.calls.settle, 1);
    const body = result.body as { error: string; result?: unknown };
    assert.equal(body.error, "settlement_failed");
    assert.equal(body.result, undefined);
  } finally {
    close();
  }
});

test("a payment with no audio is rejected before verify or settle", async () => {
  const { gw, facilitator } = gateway();
  const res = await gw.handleSignals(post(undefined, { "PAYMENT-SIGNATURE": "e30=" }));
  assert.equal(res.status, 400);
  assert.equal(facilitator.calls.verify + facilitator.calls.settle, 0);
});

test("a forged payment is rejected by verify and never settled", async () => {
  const { gw, facilitator } = gateway();
  const first = await gw.handleSignals(post(wavForm()));
  const pr = decodePaymentRequiredHeader(first.headers.get("PAYMENT-REQUIRED")!);
  const req = pr.accepts[0];
  const now = Math.floor(Date.now() / 1000);
  const forged = {
    x402Version: 2,
    resource: pr.resource,
    accepted: req,
    payload: {
      signature: "0x" + "11".repeat(65),
      authorization: {
        from: privateKeyToAccount(generatePrivateKey()).address,
        to: req.payTo,
        value: req.amount,
        validAfter: String(now - 600),
        validBefore: String(now + 300),
        nonce: "0x" + "22".repeat(32),
      },
    },
  };
  const header = Buffer.from(JSON.stringify(forged)).toString("base64");
  const res = await gw.handleSignals(post(wavForm(), { "PAYMENT-SIGNATURE": header }));
  assert.equal(res.status, 402);
  assert.equal(facilitator.calls.verify, 1);
  assert.equal(facilitator.calls.settle, 0);
  assert.equal(res.headers.get("PAYMENT-RESPONSE"), null);
});

test("free health/pricing endpoint", async () => {
  const { gw } = gateway();
  const res = await gw.health();
  assert.equal(res.status, 200);
  const h = await res.json();
  assert.equal(h.ok, true);
  assert.equal(h.endpoint.path, URL_PATH);
  assert.equal(h.pricing.amount, "10000");
  assert.equal(h.pricing.payTo, PAPAGEDON_PAYEE);
  assert.equal(h.settlement.apiKeyConfigured, true);
  assert.equal(JSON.stringify(h).includes("X-API-Key"), false);
});

test("an unfunded wallet is told why: verify fails, nothing runs or settles", async () => {
  const { gw, facilitator } = gateway({ verifyReason: "insufficient_funds" });
  const { url, close } = await serve(gw.handleSignals);
  try {
    const r = await runPaidCall({ url, makeBody: () => wavForm(), signer: privateKeyToAccount(generatePrivateKey()), onStep: () => undefined });
    assert.equal(r.httpStatus, 402);
    assert.equal(r.settled, false);
    assert.equal(r.transaction, null);
    assert.match(r.settleError ?? "", /doesn't hold enough USDC on Celo \(nothing was paid\)/);
    assert.deepEqual({ verify: facilitator.calls.verify, settle: facilitator.calls.settle }, { verify: 1, settle: 0 });
  } finally {
    close();
  }
});
