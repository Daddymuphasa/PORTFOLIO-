/**
 * PAPAGEDON AEI paid gateway: POST /v1/aei/signals behind x402 v2 on Celo.
 *
 * Flow (official @x402/core resource server + @x402/evm exact scheme, wired the
 * same way @x402/next's withX402 does it; @x402/next itself needs Next >= 16):
 *
 *   1. The audio is read and checked first, so nobody pays for a file the
 *      gateway can't analyse (400/413/415/422, no payment asked).
 *   2. No PAYMENT-SIGNATURE header      -> 402 + PAYMENT-REQUIRED (USDC on Celo).
 *   3. PAYMENT-SIGNATURE present        -> facilitator /verify (no funds move).
 *   4. AEI runs on the verified request.
 *   5. Only if AEI succeeded            -> facilitator /settle. The facilitator
 *      submits the payer's EIP-3009 transferWithAuthorization and pays the gas;
 *      USDC goes straight from the payer to payTo. This server holds no wallet
 *      key, only the facilitator's metering API key (X402_API_KEY).
 *   6. 200 + AEI JSON + PAYMENT-RESPONSE (settlement tx hash, also in the body).
 *
 * If AEI fails, nothing is settled and the payer keeps their USDC.
 */
import {
  FacilitatorResponseError,
  HTTPFacilitatorClient,
  x402HTTPResourceServer,
  x402ResourceServer,
  withPrivateCacheControl,
  type FacilitatorClient,
  type HTTPAdapter,
  type HTTPRequestContext,
  type HTTPResponseInstructions,
  type RoutesConfig,
} from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { parseUnits } from "viem";
import { IDENTITY, PAPAGEDON_PAYEE, USDC_CELO } from "./config";
import { AEI_ENGINE, analyzeClip, ClipError, type AeiResult } from "./signals";
import { decodeWav, looksLikeWav, WavError } from "./wav";

export const AEI_SIGNALS_PATH = "/v1/aei/signals";
export const AEI_HEALTH_PATH = "/v1/aei/health";

type Asset = { address: `0x${string}`; symbol: string; decimals: number; name: string; version: string };

export const NETWORKS = {
  celo: {
    id: "eip155:42220",
    label: "Celo mainnet",
    facilitator: "https://api.x402.celo.org",
    explorer: "https://celoscan.io",
    assets: [
      { address: USDC_CELO, symbol: "USDC", decimals: 6, name: "USDC", version: "2" },
      { address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e", symbol: "USDT", decimals: 6, name: "Tether USD", version: "1" },
    ] as Asset[],
  },
  "celo-sepolia": {
    id: "eip155:11142220",
    label: "Celo Sepolia testnet",
    facilitator: "https://api.x402.sepolia.celo.org",
    explorer: "https://celo-sepolia.blockscout.com",
    assets: [
      { address: "0x01C5C0122039549AD1493B8220cABEdD739BC44E", symbol: "USDC", decimals: 6, name: "USDC", version: "2" },
    ] as Asset[],
  },
} as const;
export type NetworkKey = keyof typeof NETWORKS;

export type GatewayConfig = {
  network: NetworkKey;
  payTo: `0x${string}`;
  /** Price per call in whole tokens, e.g. "0.01". */
  priceUsd: string;
  facilitatorUrl: string;
  /** Facilitator metering key; /settle returns 401 without it. Server-side secret. */
  apiKey: string;
  maxBytes: number;
  maxSeconds: number;
  minSeconds: number;
  maxTimeoutSeconds: number;
};

/** Vercel rejects request bodies above 4.5 MB, so stay under it. */
export const DEFAULT_MAX_BYTES = 4_000_000;

export function gatewayConfigFromEnv(env: Record<string, string | undefined> = process.env): GatewayConfig {
  const network = (env.AEI_NETWORK === "celo-sepolia" ? "celo-sepolia" : "celo") as NetworkKey;
  const payTo = (env.AEI_PAY_TO || PAPAGEDON_PAYEE).trim();
  if (!/^0x[0-9a-fA-F]{40}$/.test(payTo)) throw new Error(`AEI_PAY_TO is not an address: ${payTo}`);
  const priceUsd = (env.AEI_PRICE_USDC || "0.01").trim();
  if (!/^\d+(\.\d{1,6})?$/.test(priceUsd) || Number(priceUsd) <= 0) throw new Error(`AEI_PRICE_USDC is not a positive amount: ${priceUsd}`);
  const num = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : d);
  return {
    network,
    payTo: payTo as `0x${string}`,
    priceUsd,
    facilitatorUrl: (env.X402_FACILITATOR_URL || NETWORKS[network].facilitator).replace(/\/+$/, ""),
    apiKey: (env.X402_API_KEY || "").trim(),
    maxBytes: Math.min(num(env.AEI_MAX_BYTES, DEFAULT_MAX_BYTES), DEFAULT_MAX_BYTES),
    maxSeconds: num(env.AEI_MAX_SECONDS, 60),
    minSeconds: 1,
    maxTimeoutSeconds: 300,
  };
}

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, PAYMENT-SIGNATURE, X-PAYMENT",
  "Access-Control-Expose-Headers": "PAYMENT-REQUIRED, PAYMENT-RESPONSE, X-PAYMENT-RESPONSE",
  "Access-Control-Max-Age": "600",
};

function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...CORS, ...headers },
  });
}

function fromInstructions(r: HTTPResponseInstructions): Response {
  const headers = new Headers({ ...CORS, ...r.headers });
  if (r.isHtml) return new Response(String(r.body ?? ""), { status: r.status, headers });
  headers.set("Content-Type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(r.body ?? {}, null, 2), { status: r.status, headers });
}

/** HTTPAdapter for a standard Fetch API Request (Next.js route handlers, tests). */
class FetchRequestAdapter implements HTTPAdapter {
  private readonly url: URL;
  constructor(private readonly req: Request) {
    this.url = new URL(req.url);
  }
  getHeader(name: string) {
    return this.req.headers.get(name) ?? undefined;
  }
  getMethod() {
    return this.req.method;
  }
  getPath() {
    return this.url.pathname;
  }
  getUrl() {
    return this.req.url;
  }
  getAcceptHeader() {
    return this.req.headers.get("Accept") ?? "";
  }
  getUserAgent() {
    return this.req.headers.get("User-Agent") ?? "";
  }
  getQueryParams() {
    return Object.fromEntries(this.url.searchParams.entries());
  }
  getQueryParam(name: string) {
    return this.url.searchParams.get(name) ?? undefined;
  }
}

async function sha256Hex(data: Uint8Array | string): Promise<string> {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  const digest = await globalThis.crypto.subtle.digest("SHA-256", new Uint8Array(bytes));
  return "0x" + Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

class InputError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

/** Reads the uploaded clip: multipart field "audio" or a raw audio/wav body. Empty -> null. */
async function readAudio(req: Request, maxBytes: number): Promise<Uint8Array | null> {
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > maxBytes + 64 * 1024) throw new InputError(413, "audio_too_large", `Upload is larger than ${maxBytes} bytes`);
  const type = (req.headers.get("content-type") ?? "").toLowerCase();
  let bytes: Uint8Array;
  if (type.startsWith("multipart/form-data")) {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      throw new InputError(400, "bad_multipart", "Could not read the multipart body");
    }
    const file = form.get("audio");
    if (file === null) return null;
    if (typeof file === "string") throw new InputError(400, "bad_audio_field", 'Field "audio" must be a file');
    bytes = new Uint8Array(await file.arrayBuffer());
  } else {
    bytes = new Uint8Array(await req.arrayBuffer());
  }
  if (bytes.byteLength === 0) return null;
  if (bytes.byteLength > maxBytes) throw new InputError(413, "audio_too_large", `Audio is larger than ${maxBytes} bytes`);
  return bytes;
}

export type AeiResponseBody = {
  requestId: string;
  result: AeiResult;
  receipt: {
    requestId: string;
    endpoint: string;
    agent: { erc8004AgentId: string; selfAgentId: string };
    audioSha256: string;
    resultSha256: string;
    schema: string;
    price: { amount: string; asset: string; symbol: string; network: string; payTo: string };
    issuedAt: string;
  };
  payment?: { transaction: string; network: string; payer: string | null; explorerUrl: string | null };
};

export function createAeiGateway(opts: { config?: GatewayConfig; facilitator?: FacilitatorClient } = {}) {
  const config = opts.config ?? gatewayConfigFromEnv();
  const net = NETWORKS[config.network];
  const injected = Boolean(opts.facilitator);
  const settlementReady = injected || config.apiKey.length > 0;

  const facilitator =
    opts.facilitator ??
    new HTTPFacilitatorClient({
      url: config.facilitatorUrl,
      createAuthHeaders: config.apiKey
        ? async () => {
            const h = { "X-API-Key": config.apiKey };
            return { verify: h, settle: h, supported: h };
          }
        : undefined,
    });

  const resourceServer = new x402ResourceServer(facilitator);
  resourceServer.register(net.id, new ExactEvmScheme());

  const accepts = net.assets.map((a) => ({
    scheme: "exact",
    network: net.id,
    payTo: config.payTo,
    maxTimeoutSeconds: config.maxTimeoutSeconds,
    price: {
      amount: parseUnits(config.priceUsd, a.decimals).toString(),
      asset: a.address,
      extra: { name: a.name, version: a.version },
    },
  }));
  const primary = accepts[0];

  const pricing = {
    amount: primary.price.amount,
    display: `${config.priceUsd} ${net.assets[0].symbol}`,
    accepts: net.assets.map((a, i) => ({ symbol: a.symbol, asset: a.address, decimals: a.decimals, amount: accepts[i].price.amount })),
    network: net.id,
    networkName: net.label,
    payTo: config.payTo,
    scheme: "exact",
  };

  const routes: RoutesConfig = {
    [`POST ${AEI_SIGNALS_PATH}`]: {
      accepts,
      description: "PAPAGEDON AEI: deterministic tempo, beats, energy, silence and spectral features plus AEI Experience Signals for one audio clip",
      mimeType: "application/json",
      serviceName: "PAPAGEDON AEI",
      tags: ["audio", "music", "analysis", "aei", "celo"],
      unpaidResponseBody: async () => ({
        contentType: "application/json",
        body: {
          error: "payment_required",
          message: `Pay ${pricing.display} on ${net.label} with x402 (PAYMENT-SIGNATURE header) to run AEI on this clip.`,
          pricing,
          input: inputSpec(config),
          docs: AEI_HEALTH_PATH,
        },
      }),
      settlementFailedResponseBody: async (_ctx, failure) => ({
        contentType: "application/json",
        body: {
          error: "settlement_failed",
          reason: failure.errorReason,
          message: failure.errorMessage ?? failure.errorReason,
          note: "AEI ran but the payment did not settle, so no result is returned and no USDC moved.",
        },
      }),
    },
  };

  const http = new x402HTTPResourceServer(resourceServer, routes);
  let initPromise: Promise<void> | null = null;
  const init = () => {
    if (!initPromise) {
      initPromise = http.initialize().catch((e) => {
        initPromise = null;
        throw e;
      });
    }
    return initPromise;
  };

  async function handleSignals(req: Request): Promise<Response> {
    if (!settlementReady) {
      return json(503, {
        error: "gateway_not_configured",
        message: "Paid calls are switched off: X402_API_KEY is not set on the server, so payments could not settle. No payment was requested.",
      });
    }

    const adapter = new FetchRequestAdapter(req);
    const path = adapter.getPath();
    const context: HTTPRequestContext = {
      adapter,
      path,
      decodedPath: path,
      method: req.method,
      paymentHeader: adapter.getHeader("payment-signature") || adapter.getHeader("x-payment"),
    };

    // 1. Read and check the clip before any payment is asked for or verified.
    let audio: Uint8Array | null;
    let clip: ReturnType<typeof decodeWav> | null = null;
    try {
      audio = await readAudio(req, config.maxBytes);
      if (audio) {
        if (!looksLikeWav(audio)) {
          throw new InputError(415, "unsupported_audio", "Send the clip as a WAV file (PCM or 32-bit float). The papagedon.com/app panel converts any track for you.");
        }
        clip = decodeWav(audio);
        if (clip.durationSeconds < config.minSeconds) throw new InputError(422, "audio_too_short", `Clip must be at least ${config.minSeconds} s`);
        if (clip.durationSeconds > config.maxSeconds) throw new InputError(422, "audio_too_long", `Clip must be at most ${config.maxSeconds} s`);
      } else if (context.paymentHeader) {
        throw new InputError(400, "audio_required", 'Attach the audio (multipart field "audio" or a raw audio/wav body) with the payment.');
      }
    } catch (e) {
      if (e instanceof InputError) return json(e.status, { error: e.code, message: e.message, input: inputSpec(config) });
      if (e instanceof WavError) return json(422, { error: "bad_wav", message: e.message, input: inputSpec(config) });
      throw e;
    }

    // 2-3. x402: quote (402) or verify.
    let result: Awaited<ReturnType<typeof http.processHTTPRequest>>;
    try {
      await init();
      result = await http.processHTTPRequest(context);
    } catch (e) {
      return facilitatorError(e);
    }
    if (result.type === "payment-error") return fromInstructions(result.response);
    if (result.type === "no-payment-required") return json(500, { error: "route_not_protected" });

    // 4. AEI on the verified request. Failure -> no settlement.
    let body: AeiResponseBody;
    try {
      if (!audio || !clip) throw new InputError(400, "audio_required", "No audio");
      const aei = analyzeClip(clip);
      const requestId = globalThis.crypto.randomUUID();
      body = {
        requestId,
        result: aei,
        receipt: {
          requestId,
          endpoint: `POST ${AEI_SIGNALS_PATH}`,
          agent: { erc8004AgentId: IDENTITY.erc8004.id.toString(), selfAgentId: IDENTITY.self.id.toString() },
          audioSha256: await sha256Hex(audio),
          resultSha256: await sha256Hex(JSON.stringify(aei)),
          schema: AEI_ENGINE.schema,
          price: {
            amount: result.paymentRequirements.amount,
            asset: result.paymentRequirements.asset,
            symbol: net.assets.find((a) => a.address.toLowerCase() === result.paymentRequirements.asset.toLowerCase())?.symbol ?? "",
            network: result.paymentRequirements.network,
            payTo: result.paymentRequirements.payTo,
          },
          issuedAt: new Date().toISOString(),
        },
      };
    } catch (e) {
      await result.cancellationDispatcher.cancel({ reason: "handler_threw", error: e }).catch(() => undefined);
      const status = e instanceof InputError ? e.status : e instanceof ClipError ? 422 : 500;
      if (status === 500) console.error("[aei] analysis failed", e);
      return json(status, {
        error: e instanceof InputError ? e.code : "aei_failed",
        message: e instanceof Error ? e.message : "AEI failed",
        note: "Nothing was settled; your USDC did not move.",
      });
    }

    // 5. Settle, 6. respond with the tx hash.
    const responseBody = Buffer.from(JSON.stringify(body));
    let settled: Awaited<ReturnType<typeof http.processSettlement>>;
    try {
      settled = await http.processSettlement(result.paymentPayload, result.paymentRequirements, result.declaredExtensions, {
        request: context,
        responseBody,
        responseHeaders: { "content-type": "application/json" },
      });
    } catch (e) {
      return facilitatorError(e);
    }
    if (!settled.success) return fromInstructions(settled.response);

    body.payment = {
      transaction: settled.transaction,
      network: settled.network,
      payer: settled.payer ?? null,
      explorerUrl: settled.transaction ? `${net.explorer}/tx/${settled.transaction}` : null,
    };
    return json(200, body, { ...settled.headers, "Cache-Control": withPrivateCacheControl("no-store") });
  }

  async function health(): Promise<Response> {
    let facilitatorStatus: { reachable: boolean; supportsRoute: boolean; error?: string } = { reachable: false, supportsRoute: false };
    try {
      const supported = await Promise.race([
        facilitator.getSupported(),
        new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), 4000)),
      ]);
      facilitatorStatus = {
        reachable: true,
        supportsRoute: supported.kinds.some((k) => k.x402Version === 2 && k.scheme === "exact" && k.network === net.id),
      };
    } catch (e) {
      facilitatorStatus.error = e instanceof Error ? e.message : String(e);
    }
    return json(200, {
      ok: settlementReady && facilitatorStatus.supportsRoute,
      service: "PAPAGEDON AEI",
      endpoint: { method: "POST", path: AEI_SIGNALS_PATH, protocol: "x402 v2", scheme: "exact" },
      pricing,
      input: inputSpec(config),
      output: { mimeType: "application/json", schema: AEI_ENGINE.schema, engine: AEI_ENGINE },
      settlement: {
        facilitator: config.facilitatorUrl,
        apiKeyConfigured: settlementReady,
        facilitatorStatus,
        note: "The facilitator submits the payer's signed EIP-3009 authorization and pays gas; this server holds no wallet key.",
      },
      identity: {
        erc8004: { agentId: IDENTITY.erc8004.id.toString(), registry: IDENTITY.erc8004.registry },
        selfAgentId: { agentId: IDENTITY.self.id.toString(), registry: IDENTITY.self.registry },
        agentCard: "https://www.papagedon.com/app/.well-known/agent-card.json",
        registration: "https://www.papagedon.com/ERC4008",
      },
    });
  }

  return { config, pricing, handleSignals, health, options: () => new Response(null, { status: 204, headers: CORS }) };
}

function inputSpec(config: GatewayConfig) {
  return {
    formats: ["audio/wav (PCM 8/16/24/32-bit or 32-bit float, 1-8 channels, 8-192 kHz)"],
    send: 'multipart/form-data field "audio", or the raw WAV as the body with Content-Type audio/wav',
    maxBytes: config.maxBytes,
    minSeconds: config.minSeconds,
    maxSeconds: config.maxSeconds,
  };
}

function facilitatorError(e: unknown): Response {
  if (e instanceof FacilitatorResponseError) {
    return json(502, { error: "facilitator_error", message: e.message, note: "Nothing was settled." });
  }
  console.error("[aei] gateway error", e);
  return json(502, {
    error: "facilitator_unavailable",
    message: e instanceof Error ? e.message : "The x402 facilitator could not be reached",
    note: "Nothing was settled.",
  });
}

let singleton: ReturnType<typeof createAeiGateway> | null = null;
/** One gateway per server instance, configured from the environment. */
export function aeiGateway() {
  if (!singleton) singleton = createAeiGateway();
  return singleton;
}
