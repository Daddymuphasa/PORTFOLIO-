# papagedon.com/app — PAPAGEDON in the browser

The `/app` route runs PAPAGEDON's real-time engine pipeline in the browser and
adds Celo wallet connection plus a paid AEI call panel.

## What comes from PAPAGEDON-CORE-

Source: https://github.com/Daddymuphasa/PAPAGEDON-CORE- (branch `feat/theme-system`,
commit `4551dc4`). Nothing in that repo is modified.

| Engine (C++) | Browser (this repo) | How |
| --- | --- | --- |
| `engine/audio/SimpleFFT.h`, `engine/audio/AudioAnalyzer.cpp`, `ExperienceSignals.h` | `lib/papagedon/analyzer.ts` | Line-by-line port, same constants |
| `engine/experience/ExperienceGraph.cpp` | `lib/papagedon/experienceGraph.ts` | Port (event / state / mood) |
| `engine/rendering/shaders/**/*.frag` (74 shaders, 6 packs) | `public/papagedon-core/shaders/` | Copied verbatim; only the `#version` line is swapped for WebGL2 at load time (`lib/papagedon/shaders.ts`) |
| `themes/*.json`, pack themes | `public/papagedon-core/themes/` | Copied verbatim |
| `OpenGLRenderer.cpp` uniform smoothing (Follow, beat decay, theme lerp, PGX phase) | `lib/papagedon/renderer.ts` | Port |
| `DemoConfig::audioSource` = `file` / `input` / `loopback` | `lib/papagedon/audioSources.ts` | Web Audio equivalents (below) |
| `PAPAGEDON_DEMO_CYCLE` preset auto-cycle | "Auto" button | 20 s cycle |

Re-sync shaders and themes after engine changes:

```bash
npm run sync:core            # expects ../PAPAGEDON-CORE- next to this repo
node scripts/sync-papagedon-core.mjs /path/to/PAPAGEDON-CORE-
```

Not ported yet (native player only): the 10 randomised FBO transition effects,
the PGX feedback and waveform overlay passes, the Auto-VJ director
(`AutoDirector.cpp`) and the T/B section show modes. Shader switches are instant.

## Audio inputs (same three as the native player)

| Native `audioSource` | Native code | Browser |
| --- | --- | --- |
| `file` | `AudioInput::Load` + `AudioPlayer`; CLI path, `config/demo.json` `audioFile`, or drag-and-drop on the window (`Runtime.cpp` `ConsumeDroppedFile`) | **File** button or drop a track anywhere |
| `input` | `AudioCapture::Initialize(device, false)` (mic, DJ mixer, audio interface) | **Mic / input** with a device picker (`getUserMedia`, echo cancellation, noise suppression and AGC off) |
| `loopback` | `AudioCapture::Initialize(device, true)` (what the computer is playing) | **System**: share a tab or screen with "Share audio" ticked (`getDisplayMedia`, Chrome/Edge) |

Keys: Space play/pause · `[` `]` previous/next shader · `1`–`9` theme · `A` auto-cycle · `H` hide UI.

## Wallet

wagmi v3 + viem on Celo mainnet (42220), following the
`Web3Provider` / `WalletButton` pattern from MEGAPOT-CHECKERS. Injected wallets
always work; WalletConnect appears when `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
is set (CSP is widened for WalletConnect only in that case).

## Paid AEI call panel

One card shows the whole flow at a glance:

1. **Gateway call**: `POST {NEXT_PUBLIC_AEI_GATEWAY_URL}{NEXT_PUBLIC_AEI_ENDPOINT_PATH}`
   with the loaded track (or an 8 s recording of the live source) as multipart
   field `audio`; status, HTTP code, latency.
2. **Payment**: the x402 quote (amount in USDC, payer → payee). The wallet signs
   an EIP-3009 `transferWithAuthorization`; the browser sends no transaction and
   pays no gas.
3. **Settlement tx**: the hash from the gateway's `PAYMENT-RESPONSE` header,
   linked to `https://celoscan.io/tx/<hash>`, plus the AEI result JSON.

The client is `lib/aei/paidCall.ts` (official `@x402/fetch` + `@x402/evm`).
Before asking the wallet to sign, it refuses any quote that is not: scheme
`exact`, network `eip155:42220`, asset USDC
`0xcEBA9300f2b948710d2653dD7B07f33A8B32118C`, payTo
`0x9A47cC17077ea358052FF6233d8aBEe0041E35ed`, amount ≤
`NEXT_PUBLIC_AEI_MAX_PRICE_USDC`.

Below the flow, the panel shows the ERC-8004 agent #9882 and Self Agent ID #192
registration txs, with owners re-checked on-chain (read-only) every 5 minutes.
They are labelled as registrations, not payments.

### The gateway

The paid gateway lives in this repo: `POST /v1/aei/signals`
(`app/v1/aei/signals/route.ts`, `lib/aei/gateway.ts`). See
[`AEI_GATEWAY.md`](./AEI_GATEWAY.md) for the flow, input/output and setup.

* The panel sends a WAV clip (20 s of the loaded track from the play position,
  or 8 s recorded from the mic / system audio, decoded in the browser), field
  `audio`. The gateway only reads WAV, so it analyses exactly those samples.
* 402 + `PAYMENT-REQUIRED`: `exact` on `eip155:42220`, USDC, 10000 units
  (0.01), `payTo` the PAPAGEDON wallet, `extra: { name: "USDC", version: "2" }`
  (a USDT option follows; the panel picks USDC).
* Verify and settle through `https://api.x402.celo.org`; settle only after AEI
  succeeded. 200 JSON + `PAYMENT-RESPONSE` (with `transaction`); the tx hash is
  also in `body.payment`.
* CORS: `*`, allows `PAYMENT-SIGNATURE`, exposes `PAYMENT-REQUIRED, PAYMENT-RESPONSE`.

Paid calls stay off (panel: "Gateway not live") until
`NEXT_PUBLIC_AEI_GATEWAY_URL=same-origin` and the server's `X402_API_KEY` are set.

## Env vars

See `.env.example`. Browser (public, read at build time):
`NEXT_PUBLIC_AEI_GATEWAY_URL`, `NEXT_PUBLIC_AEI_ENDPOINT_PATH`,
`NEXT_PUBLIC_AEI_MAX_PRICE_USDC`, `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`,
`NEXT_PUBLIC_CELO_RPC_URL`. Gateway (server only): `X402_API_KEY` (secret),
`AEI_PAY_TO`, `AEI_PRICE_USDC`, `AEI_NETWORK`, `X402_FACILITATOR_URL`.

## Checks

```bash
npm test        # analyzer port, quote guard, x402 client e2e, gateway 402/paid flow, AEI on a sample WAV
npm run build   # type-check + production build
```

All 74 engine shaders were compile- and link-tested in headless Chrome WebGL2.
