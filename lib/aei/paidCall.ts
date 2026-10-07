/**
 * Client side of a paid AEI call over x402 v2 (exact scheme, USDC on Celo).
 *
 *   1. POST audio to the gateway        -> 402 + PAYMENT-REQUIRED
 *   2. check the quote (Celo, USDC, PAPAGEDON payee, under the price ceiling)
 *   3. the wallet signs an EIP-3009 transferWithAuthorization (no gas, no tx
 *      sent by the browser; the Celo facilitator settles it)
 *   4. POST again with PAYMENT-SIGNATURE -> 200 + AEI result + PAYMENT-RESPONSE
 *   5. PAYMENT-RESPONSE carries the settlement tx hash shown with a Celoscan link
 *
 * Uses the official @x402/fetch + @x402/evm clients; nothing is hand-rolled.
 */
import { x402Client, x402HTTPClient, type PaymentRequired, type PaymentRequirements } from "@x402/fetch";
import { ExactEvmScheme } from "@x402/evm/exact/client";
import type { ClientEvmSigner } from "@x402/evm";
import { parseUnits } from "viem";
import { AEI_MAX_PRICE_USDC, CELO_NETWORK, PAPAGEDON_PAYEE, USDC_CELO, USDC_DECIMALS } from "./config";

export type PaidCallStep =
  | { stage: "requesting"; url: string }
  | { stage: "quoted"; requirement: PaymentRequirements }
  | { stage: "signing"; requirement: PaymentRequirements }
  | { stage: "submitting" }
  | { stage: "done"; result: PaidCallResult };

export type PaidCallResult = {
  httpStatus: number;
  paid: boolean;
  requirement: PaymentRequirements | null;
  amountUsdc: string | null;
  transaction: string | null;
  payer: string | null;
  settled: boolean;
  settleError: string | null;
  body: unknown;
  ms: number;
};

const lower = (s: string) => s.toLowerCase();

export const maxPriceUnits = () => parseUnits(AEI_MAX_PRICE_USDC, USDC_DECIMALS);

export function formatUsdc(units: string | bigint): string {
  const v = BigInt(units);
  const unit = BigInt(1_000_000);
  const whole = v / unit;
  const frac = (v % unit).toString().padStart(6, "0").replace(/0+$/, "");
  return frac ? `${whole}.${frac.padEnd(2, "0")}` : `${whole}.00`;
}

/** Returns why a quote is unacceptable, or null when it is safe to sign. */
export function checkRequirement(r: PaymentRequirements): string | null {
  if (r.scheme !== "exact") return `Unsupported scheme "${r.scheme}"`;
  if (r.network !== CELO_NETWORK) return `Wrong network ${r.network} (expected Celo mainnet ${CELO_NETWORK})`;
  if (lower(r.asset) !== lower(USDC_CELO)) return `Unexpected token ${r.asset} (expected USDC on Celo)`;
  if (lower(r.payTo) !== lower(PAPAGEDON_PAYEE)) return `Unexpected payee ${r.payTo} (expected the PAPAGEDON wallet)`;
  let amount: bigint;
  try {
    amount = BigInt(r.amount);
  } catch {
    return `Invalid amount ${r.amount}`;
  }
  if (amount <= BigInt(0)) return "Amount must be positive";
  if (amount > maxPriceUnits()) return `Price ${formatUsdc(amount)} USDC is above the ${AEI_MAX_PRICE_USDC} USDC ceiling`;
  return null;
}

export function pickRequirement(pr: PaymentRequired): { requirement: PaymentRequirements } | { error: string } {
  const reasons: string[] = [];
  for (const r of pr.accepts ?? []) {
    const why = checkRequirement(r);
    if (!why) return { requirement: r };
    reasons.push(why);
  }
  return { error: reasons[0] ?? "The gateway offered no payment options" };
}

async function readBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const REJECTIONS: Record<string, string> = {
  insufficient_funds: "this wallet doesn't hold enough USDC on Celo",
  invalid_exact_evm_payload_signature: "the signature didn't match",
  invalid_exact_evm_payload_authorization_valid_before: "the signed payment expired, try again",
};

/** Turns an x402 / facilitator error code into a short sentence. Nothing was paid in any of these cases. */
export function explainRejection(code: string): string {
  return `${REJECTIONS[code] ?? code.replace(/_/g, " ")} (nothing was paid)`;
}

export async function runPaidCall(opts: {
  url: string;
  makeBody: () => FormData;
  signer: ClientEvmSigner;
  onStep: (s: PaidCallStep) => void;
}): Promise<PaidCallResult> {
  const t0 = performance.now();
  const { url, makeBody, signer, onStep } = opts;
  onStep({ stage: "requesting", url });

  const first = await fetch(url, { method: "POST", body: makeBody() });
  if (first.status !== 402) {
    const result: PaidCallResult = {
      httpStatus: first.status,
      paid: false,
      requirement: null,
      amountUsdc: null,
      transaction: null,
      payer: null,
      settled: false,
      settleError: first.ok ? "The gateway answered without asking for payment" : null,
      body: await readBody(first),
      ms: performance.now() - t0,
    };
    onStep({ stage: "done", result });
    return result;
  }

  const probe = new x402HTTPClient(new x402Client());
  const paymentRequired = probe.getPaymentRequiredResponse((h) => first.headers.get(h), await readBody(first));
  const picked = pickRequirement(paymentRequired);
  if ("error" in picked) throw new Error(`Refusing to pay: ${picked.error}`);
  const requirement = picked.requirement;
  onStep({ stage: "quoted", requirement });

  const client = new x402Client((_version, reqs) => reqs.find((r) => r === requirement) ?? requirement);
  client.register(CELO_NETWORK, new ExactEvmScheme(signer));
  const http = new x402HTTPClient(client);

  onStep({ stage: "signing", requirement });
  const payload = await client.createPaymentPayload({ ...paymentRequired, accepts: [requirement] });
  const headers = http.encodePaymentSignatureHeader(payload);

  onStep({ stage: "submitting" });
  const second = await fetch(url, { method: "POST", body: makeBody(), headers });
  const body = await readBody(second);
  let transaction: string | null = null;
  let payer: string | null = null;
  let settled = false;
  let settleError: string | null = null;
  try {
    const settle = http.getPaymentSettleResponse((h) => second.headers.get(h));
    transaction = settle.transaction || null;
    payer = settle.payer ?? null;
    settled = settle.success;
    settleError = settle.success ? null : settle.errorMessage ?? settle.errorReason ?? "Settlement failed";
  } catch {
    if (second.status === 402) {
      let reason = "";
      try {
        reason = http.getPaymentRequiredResponse((h) => second.headers.get(h), body).error ?? "";
      } catch {
        // no readable PAYMENT-REQUIRED on the rejection
      }
      settleError = `The gateway rejected the payment${reason ? `: ${explainRejection(reason)}` : ""}`;
    } else {
      settleError = second.ok
        ? "No PAYMENT-RESPONSE header (the gateway must expose it via Access-Control-Expose-Headers)"
        : null;
    }
  }
  const result: PaidCallResult = {
    httpStatus: second.status,
    paid: true,
    requirement,
    amountUsdc: formatUsdc(requirement.amount),
    transaction,
    payer: payer ?? signer.address,
    settled,
    settleError,
    body,
    ms: performance.now() - t0,
  };
  onStep({ stage: "done", result });
  return result;
}
