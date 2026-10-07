/**
 * End-to-end check of the browser's x402 client against a local mock gateway.
 * Uses a throwaway key generated in memory: nothing touches a real chain,
 * no funds exist, and the "settlement tx" below is a fake hash from the mock.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { getAddress, verifyTypedData } from "viem";
import {
  decodePaymentSignatureHeader,
  encodePaymentRequiredHeader,
  encodePaymentResponseHeader,
} from "@x402/core/http";
import { runPaidCall, type PaidCallStep } from "../lib/aei/paidCall";
import { PAPAGEDON_PAYEE, USDC_CELO } from "../lib/aei/config";

const FAKE_TX = "0x" + "ab".repeat(32);
const requirement = {
  scheme: "exact",
  network: "eip155:42220" as const,
  asset: USDC_CELO,
  amount: "10000",
  payTo: PAPAGEDON_PAYEE,
  maxTimeoutSeconds: 120,
  extra: { name: "USDC", version: "2" },
};

test("pays a mock x402 gateway and surfaces the settlement tx", async () => {
  let verified = false;
  const server = http.createServer(async (req, res) => {
    for await (const _ of req) void _; // drain the multipart body
    const sig = req.headers["payment-signature"] as string | undefined;
    if (!sig) {
      res.writeHead(402, {
        "PAYMENT-REQUIRED": encodePaymentRequiredHeader({
          x402Version: 2,
          resource: { url: "http://mock/v1/aei/signals", description: "AEI signals", mimeType: "application/json" },
          accepts: [requirement],
        }),
        "Content-Type": "application/json",
      });
      res.end("{}");
      return;
    }
    const payload = decodePaymentSignatureHeader(sig);
    const p = payload.payload as { signature: `0x${string}`; authorization: Record<string, string> };
    const a = p.authorization;
    verified = await verifyTypedData({
      address: a.from as `0x${string}`,
      domain: { name: "USDC", version: "2", chainId: 42220, verifyingContract: getAddress(USDC_CELO) },
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
    assert.equal(getAddress(a.to), getAddress(PAPAGEDON_PAYEE));
    assert.equal(a.value, "10000");
    res.writeHead(200, {
      "Content-Type": "application/json",
      "PAYMENT-RESPONSE": encodePaymentResponseHeader({ success: true, transaction: FAKE_TX, network: "eip155:42220", payer: a.from }),
    });
    res.end(JSON.stringify({ requestId: "mock-1", signals: { bpm: 120 } }));
  });
  await new Promise<void>((r) => server.listen(0, r));
  const url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/v1/aei/signals`;
  const account = privateKeyToAccount(generatePrivateKey());
  const stages: string[] = [];
  try {
    const result = await runPaidCall({
      url,
      makeBody: () => {
        const fd = new FormData();
        fd.append("audio", new Blob([new Uint8Array(16)], { type: "audio/wav" }), "clip.wav");
        return fd;
      },
      signer: account,
      onStep: (s: PaidCallStep) => stages.push(s.stage),
    });
    assert.ok(verified, "gateway verified the EIP-3009 signature");
    assert.deepEqual(stages, ["requesting", "quoted", "signing", "submitting", "done"]);
    assert.equal(result.httpStatus, 200);
    assert.equal(result.amountUsdc, "0.01");
    assert.equal(result.transaction, FAKE_TX);
    assert.equal(result.settled, true);
    assert.deepEqual(result.body, { requestId: "mock-1", signals: { bpm: 120 } });
  } finally {
    server.close();
  }
});
