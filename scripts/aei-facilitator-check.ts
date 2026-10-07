/**
 * Live check of the paid AEI gateway against the real Celo x402 facilitator,
 * without spending anything:
 *
 *   npx tsx scripts/aei-facilitator-check.ts [path/to/clip.wav]
 *
 * 1. GET {facilitator}/supported           (open endpoint)
 * 2. The gateway's real 402 quote          (exact, eip155:42220, USDC, payTo)
 * 3. A throwaway in-memory wallet with no funds signs the EIP-3009 payment
 *    with the web app's own x402 client, and the gateway sends it to the real
 *    facilitator's /verify (open endpoint, off-chain check only).
 *
 * Expected: /verify accepts the format and signature but rejects the payment
 * for insufficient funds, so the gateway answers 402 and runs nothing.
 * /settle is never called: the facilitator client here has settle() disabled,
 * no API key is used, and the payer holds no USDC.
 */
import { readFileSync } from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { HTTPFacilitatorClient, type FacilitatorClient } from "@x402/core/server";
import { decodePaymentRequiredHeader } from "@x402/core/http";
import { createAeiGateway, gatewayConfigFromEnv } from "../lib/aei/gateway";
import { runPaidCall } from "../lib/aei/paidCall";

const clipPath = process.argv[2] ?? new URL("../tests/fixtures/kick-120bpm.wav", import.meta.url);
const wav = new Uint8Array(readFileSync(clipPath));
const config = gatewayConfigFromEnv({ AEI_NETWORK: process.env.AEI_NETWORK });
const real = new HTTPFacilitatorClient({ url: config.facilitatorUrl });
let verifyCalls = 0;
const verifyOnly: FacilitatorClient = {
  getSupported: () => real.getSupported(),
  verify: async (p, r) => {
    verifyCalls++;
    try {
      const res = await real.verify(p, r);
      console.log("facilitator /verify ->", JSON.stringify(res));
      return res;
    } catch (e) {
      const err = e as { message?: string; invalidReason?: string; invalidMessage?: string };
      console.log("facilitator /verify rejected ->", err.invalidReason ?? "", err.invalidMessage ?? err.message ?? String(e));
      throw e;
    }
  },
  settle: async () => {
    throw new Error("settle is disabled in this check script");
  },
};

async function main() {
  const supported = await real.getSupported();
  const kind = supported.kinds.find((k) => k.x402Version === 2 && k.scheme === "exact" && k.network === "eip155:42220");
  console.log("facilitator", config.facilitatorUrl, "supports exact on eip155:42220:", Boolean(kind));

  const gw = createAeiGateway({ config, facilitator: verifyOnly });
  const server = http.createServer(async (req, res) => {
    const chunks: Buffer[] = [];
    for await (const c of req) chunks.push(c as Buffer);
    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
    const out = await gw.handleSignals(new Request(`http://127.0.0.1${req.url}`, { method: req.method, headers, body: Buffer.concat(chunks) }));
    res.writeHead(out.status, Object.fromEntries(out.headers.entries()));
    res.end(Buffer.from(await out.arrayBuffer()));
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  const url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/v1/aei/signals`;
  const body = () => {
    const fd = new FormData();
    fd.append("audio", new Blob([wav], { type: "audio/wav" }), "clip.wav");
    return fd;
  };
  try {
    const quote = await fetch(url, { method: "POST", body: body() });
    const pr = decodePaymentRequiredHeader(quote.headers.get("PAYMENT-REQUIRED")!);
    console.log("gateway quote:", quote.status, JSON.stringify(pr.accepts[0]));

    const payer = privateKeyToAccount(generatePrivateKey());
    console.log("throwaway payer (no funds):", payer.address);
    const r = await runPaidCall({ url, makeBody: body, signer: payer, onStep: () => undefined });
    console.log("gateway answer:", r.httpStatus, "settled:", r.settled, "tx:", r.transaction);
    console.log("verify calls:", verifyCalls, "settle calls: 0 (disabled)");
  } finally {
    server.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
