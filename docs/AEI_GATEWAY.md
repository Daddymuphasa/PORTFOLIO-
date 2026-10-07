# PAPAGEDON AEI paid gateway (x402 on Celo)

`POST https://www.papagedon.com/v1/aei/signals` runs PAPAGEDON AEI on one audio
clip and charges **0.01 USDC on Celo mainnet** per call via
[x402 v2](https://x402.org) and the Celo facilitator
(`https://api.x402.celo.org`). USDT is accepted at the same price.

| | |
| --- | --- |
| Paid endpoint | `POST /v1/aei/signals` (`app/v1/aei/signals/route.ts`) |
| Free status / pricing | `GET /v1/aei/health` (also `GET /v1/aei/signals`) |
| Price | 0.01 USDC (`10000` units, 6 decimals), or 0.01 USDT |
| Network | Celo mainnet, `eip155:42220` |
| payTo | `0x9A47cC17077ea358052FF6233d8aBEe0041E35ed` (owner of ERC-8004 agent 9882 and Self Agent ID 192) |
| Scheme | `exact` (EIP-3009 `transferWithAuthorization`; the payer signs, the facilitator submits and pays gas) |
| Code | `lib/aei/gateway.ts` (x402), `lib/aei/signals.ts` (AEI), `lib/aei/wav.ts` (input) |

## Flow

```
client                          gateway (this site)                 Celo facilitator
  | POST audio ------------------> | check WAV (400/413/415/422 if bad, no payment asked)
  | <------ 402 PAYMENT-REQUIRED -- | quote: exact, eip155:42220, USDC 10000 -> payTo
  | wallet signs EIP-3009 (no gas, no tx from the client)
  | POST audio + PAYMENT-SIGNATURE>| ---- /verify (off-chain) ---------> |
  |                                | run AEI on the clip                 |
  |                                | ---- /settle (only if AEI worked) -> | submits the transfer
  | <-- 200 JSON + PAYMENT-RESPONSE | tx hash in the header and in body.payment
```

* Nothing settles unless AEI succeeded; a failed settlement returns 402 and no result.
* The server holds **no wallet key**. It only needs the facilitator's metering
  key `X402_API_KEY` (the facilitator's `/settle` requires it). Without that
  key the endpoint answers 503 and never asks anyone to pay.
* Built on the official `@x402/core` resource server and `@x402/evm` exact
  scheme, wired like `@x402/next`'s `withX402` (that package needs Next ≥ 16.2).

## Input

WAV only: PCM 8/16/24/32-bit or 32-bit float, 1-8 channels, 8-192 kHz,
1-60 s, ≤ 4 MB (Vercel's request limit is 4.5 MB). Either

* `multipart/form-data` with the file in field `audio`, or
* the raw WAV as the body with `Content-Type: audio/wav`.

WAV decodes to the same samples everywhere, so the same file always gives the
same result. The papagedon.com/app panel decodes any track, mic or system
audio in the browser and sends a 20 s (file) or 8 s (live) mono 16-bit WAV.
Compressed formats (mp3, ogg, webm) get 415 before any payment is requested.

## Output (200)

```jsonc
{
  "requestId": "…",
  "result": {
    "schema": "aei.signals.v1",
    "engine": { "core": "PAPAGEDON-CORE- 4551dc4 (AudioAnalyzer, ExperienceGraph)", "analysisRate": 60, "windowSize": 1024, … },
    "audio":    { "durationSeconds", "sampleRate", "channels", "windows" },
    "tempo":    { "bpm", "beatCount", "beats": [seconds…] },
    "energy":   { "mean", "peak", "loudnessDbfs", "peakDbfs", "perSecond": […] },
    "silence":  { "ratio", "thresholdDbfs": -50, "segments": [{ "start", "end" }] },
    "spectral": { "bass", "mid", "treble", "intensity", "centroidHz", "bands": [64 values] },
    "signals":  { "dominantState", "mood", "tension", "eventCounts", "drops", "buildUps", "timeline": [{ "state", "start", "end" }] }
  },
  "receipt": { "audioSha256", "resultSha256", "schema", "agent": { "erc8004AgentId": "9882", "selfAgentId": "192" }, "price": {…}, "issuedAt" },
  "payment": { "transaction": "0x…", "network": "eip155:42220", "payer": "0x…", "explorerUrl": "https://celoscan.io/tx/0x…" }
}
```

`result` is computed by the same `AudioAnalyzer` and `ExperienceGraph` the
web app renders with (ports of PAPAGEDON-CORE-), stepped over the clip at 60
windows per second of audio. `resultSha256` is the SHA-256 of
`JSON.stringify(result)`, so anyone can re-run the clip and compare.

## Calling it from an agent

Any x402 v2 client works. With the official fetch wrapper:

```ts
import { wrapFetchWithPayment, x402Client } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm/exact/client";
const client = new x402Client();
client.register("eip155:42220", new ExactEvmScheme(agentWalletAccount)); // the agent's own wallet
const pay = wrapFetchWithPayment(fetch, client);
const res = await pay("https://www.papagedon.com/v1/aei/signals", {
  method: "POST",
  headers: { "Content-Type": "audio/wav" },
  body: wavBytes,
});
```

## Configuration (Vercel → Settings → Environment Variables)

| Name | Value | Notes |
| --- | --- | --- |
| `X402_API_KEY` | from x402.celo.org | **Secret.** Server only. Required for paid calls. |
| `NEXT_PUBLIC_AEI_GATEWAY_URL` | `same-origin` | Turns the /app panel on, pointed at this site's own gateway. |
| `AEI_PAY_TO` | `0x9A47cC17077ea358052FF6233d8aBEe0041E35ed` | Optional; that is the default. The panel only pays this address. |
| `AEI_PRICE_USDC` | `0.01` | Optional; default. Must stay ≤ `NEXT_PUBLIC_AEI_MAX_PRICE_USDC` (0.05) for the panel. |
| `AEI_NETWORK` | `celo` | Optional; `celo-sepolia` for testnet (agents only; the panel pays mainnet only). |

## Checks

```bash
npm test                                    # 402 quote, bad input, paid flow vs a stand-in facilitator, AEI on tests/fixtures/kick-120bpm.wav
npx tsx scripts/aei-facilitator-check.ts    # real facilitator /supported + /verify with an unfunded throwaway key; never settles
npm run build
```
