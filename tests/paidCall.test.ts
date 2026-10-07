import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRequirement, formatUsdc, pickRequirement } from "../lib/aei/paidCall";
import { PAPAGEDON_PAYEE, USDC_CELO } from "../lib/aei/config";
import { toWebGL2 } from "../lib/papagedon/shaders";

const good = {
  scheme: "exact",
  network: "eip155:42220" as const,
  asset: USDC_CELO,
  amount: "10000",
  payTo: PAPAGEDON_PAYEE,
  maxTimeoutSeconds: 60,
  extra: { name: "USDC", version: "2" },
};

test("accepts a 0.01 USDC Celo quote paid to the PAPAGEDON wallet", () => {
  assert.equal(checkRequirement(good), null);
  assert.equal(formatUsdc(good.amount), "0.01");
});

test("refuses quotes that are unsafe to sign", () => {
  assert.match(checkRequirement({ ...good, network: "eip155:8453" })!, /Wrong network/);
  assert.match(checkRequirement({ ...good, payTo: "0x000000000000000000000000000000000000dEaD" })!, /payee/);
  assert.match(checkRequirement({ ...good, asset: "0x765DE816845861e75A25fCA122bb6898B8B1282a" })!, /token/);
  assert.match(checkRequirement({ ...good, amount: "50000000" })!, /ceiling/);
  assert.match(checkRequirement({ ...good, scheme: "upto" })!, /scheme/);
});

test("picks the first safe option", () => {
  const r = pickRequirement({
    x402Version: 2,
    resource: { url: "https://x/v1/aei/signals", description: "", mimeType: "application/json" },
    accepts: [{ ...good, network: "eip155:8453" }, good],
  });
  assert.ok("requirement" in r && r.requirement === good);
});

test("WebGL2 adapter only swaps the #version line", () => {
  const src = "#version 330 core\nin vec2 vUV;\nout vec4 fragColor;\nvoid main(){fragColor=vec4(1);}\n";
  const out = toWebGL2(src);
  assert.ok(out.startsWith("#version 300 es\nprecision highp float;"));
  assert.ok(out.endsWith(src.split("\n").slice(1).join("\n")));
});
