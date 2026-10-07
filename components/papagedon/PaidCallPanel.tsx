"use client";

import { useState } from "react";
import { CollapsibleSection, Disclosure } from "./ui/Collapsible";
import { CeloIcon, UsdcIcon } from "./wallet/icons";
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from "wagmi";
import { celo } from "wagmi/chains";
import type { ClientEvmSigner } from "@x402/evm";
import {
  AEI_MAX_PRICE_USDC,
  IDENTITY,
  PAPAGEDON_PAYEE,
  addressUrl,
  aeiEndpoint,
  short,
  txUrl,
} from "@/lib/aei/config";
import { formatUsdc, runPaidCall, type PaidCallResult, type PaidCallStep } from "@/lib/aei/paidCall";

export type IdentityStatus = {
  erc8004Owner: string | null;
  selfOwner: string | null;
  checkedAt: string | null;
};

type Clip = { blob: Blob; name: string; label?: string };

const STAGE_LABEL: Record<PaidCallStep["stage"], string> = {
  requesting: "Calling the gateway…",
  quoted: "Quote received",
  signing: "Sign the USDC payment in your wallet…",
  submitting: "Payment signed · running AEI…",
  done: "Done",
};

type Status = "idle" | "busy" | "ok" | "err" | "off";

function Step({ n, title, status, children }: { n: number; title: string; status: Status; children: React.ReactNode }) {
  return (
    <li className={`pgx-step is-${status}`}>
      <span className="pgx-step-dot" aria-hidden="true">
        {status === "ok" ? (
          <svg viewBox="0 0 16 16" width="11" height="11"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ) : status === "err" ? (
          "!"
        ) : (
          n
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="pgx-step-title">{title}</div>
        <div className="pgx-step-body">{children}</div>
      </div>
    </li>
  );
}

type AeiBody = {
  result?: {
    tempo?: { bpm?: number; beatCount?: number };
    signals?: { dominantState?: string; mood?: number };
    audio?: { durationSeconds?: number };
  };
};

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="pgx-mini-btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        } catch {
          /* clipboard blocked */
        }
      }}
    >
      {done ? "Copied" : label}
    </button>
  );
}

export default function PaidCallPanel({
  identity,
  getClip,
}: {
  identity: IdentityStatus;
  getClip: () => Promise<Clip | null>;
}) {
  const endpoint = aeiEndpoint();
  const live = Boolean(endpoint);
  const { address, isConnected, chainId } = useAccount();
  const { data: walletClient } = useWalletClient({ chainId: celo.id });
  const publicClient = usePublicClient({ chainId: celo.id });
  const { switchChainAsync } = useSwitchChain();
  const [step, setStep] = useState<PaidCallStep | null>(null);
  // Display only: remember the last quote so step 2 stays filled while the paid retry runs.
  const [quote, setQuote] = useState<Extract<PaidCallStep, { stage: "quoted" }>["requirement"] | null>(null);
  const onStep = (st: PaidCallStep) => {
    setStep(st);
    if ("requirement" in st) setQuote(st.requirement);
  };
  const [result, setResult] = useState<PaidCallResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clipLabel, setClipLabel] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const busy = running || (step !== null && step.stage !== "done" && !error);

  const verified = (owner: string | null) =>
    owner === null ? "unverified" : owner.toLowerCase() === PAPAGEDON_PAYEE.toLowerCase() ? "verified" : "mismatch";

  async function run() {
    setRunning(true);
    setError(null);
    setResult(null);
    setStep(null);
    setQuote(null);
    setClipLabel(null);
    try {
      if (!live) throw new Error("The paid AEI gateway is not live yet.");
      if (!isConnected || !address) throw new Error("Connect a wallet first.");
      if (chainId !== celo.id) await switchChainAsync({ chainId: celo.id });
      if (!walletClient) throw new Error("Wallet not ready on Celo yet. Try again in a moment.");
      setPreparing(true);
      const clip = await getClip().finally(() => setPreparing(false));
      if (!clip) throw new Error("Load a track or start a live source first.");
      setClipLabel(clip.label ?? clip.name);
      const account = walletClient.account;
      const signer: ClientEvmSigner = {
        address: account.address,
        // x402 hands over a fully-formed EIP-712 payload; viem's generics can't infer it.
        signTypedData: (m) =>
          (walletClient.signTypedData as (args: Record<string, unknown>) => Promise<`0x${string}`>)({
            account,
            domain: m.domain,
            types: m.types,
            primaryType: m.primaryType,
            message: m.message,
          }),
        readContract: publicClient
          ? (args) => publicClient.readContract(args as never) as Promise<unknown>
          : undefined,
      };
      const makeBody = () => {
        const fd = new FormData();
        fd.append("audio", clip.blob, clip.name);
        return fd;
      };
      const r = await runPaidCall({ url: endpoint, makeBody, signer, onStep });
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message.split("\n")[0] : String(e));
    } finally {
      setRunning(false);
    }
  }

  const clear = () => {
    setResult(null);
    setError(null);
    setStep(null);
    setQuote(null);
    setClipLabel(null);
  };

  const req = step && "requirement" in step ? step.requirement : result?.requirement ?? quote;
  const gatewayStatus: Status = !live ? "off" : error && !req ? "err" : preparing ? "busy" : step ? (result ? (result.httpStatus < 400 ? "ok" : "err") : "busy") : "idle";
  const payStatus: Status = !live ? "off" : result?.paid ? (result.settled ? "ok" : "err") : req ? (error ? "err" : step?.stage === "submitting" ? "ok" : "busy") : "idle";
  const txStatus: Status = !live ? "off" : result?.transaction ? (result.settled ? "ok" : "err") : result?.settleError ? "err" : busy && req ? "busy" : "idle";
  const settledOk = Boolean(result?.transaction && result.settled);
  const aei = (result?.body as AeiBody | null)?.result;
  const priceLabel = req ? `${formatUsdc(req.amount)} USDC` : "0.01 USDC";

  const summary = !live ? (
    <span className="text-subtle">Not live</span>
  ) : busy ? (
    <span className="pgx-live-text">{preparing ? "Preparing clip…" : step ? STAGE_LABEL[step.stage] : "Starting…"}</span>
  ) : settledOk ? (
    <span className="pgx-gold-text">Settled · {short(result!.transaction!, 4)}</span>
  ) : error || result?.settleError ? (
    <span className="text-red-300">Needs attention</span>
  ) : (
    <span>{priceLabel} / call</span>
  );

  return (
    <CollapsibleSection
      title="Paid AEI call"
      tone="gold"
      forceOpen={running || busy || result !== null || error !== null}
      icon={<UsdcIcon size={16} />}
      summary={summary}
      className="w-full"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className={`pgx-badge ${live ? "pgx-badge-green" : ""}`}>
          {live ? <CeloIcon size={11} /> : null}
          {live ? "Celo mainnet · x402" : "Gateway not live"}
        </span>
        <span className="font-mono text-[11px] text-muted">{priceLabel} per call</span>
      </div>

      {!live && (
        <p className="pgx-note">
          Paid AEI calls are switched off on this deployment, so no call, payment or settlement tx can happen here. They go live when{" "}
          <code>NEXT_PUBLIC_AEI_GATEWAY_URL</code> is set (the gateway is this site&apos;s own <code>/v1/aei/signals</code>).
        </p>
      )}

      <ol className="pgx-steps">
        <Step n={1} title="Clip → AEI gateway" status={gatewayStatus}>
          {live ? (
            <>
              <span className="font-mono text-[11.5px] text-foreground/80">POST {endpoint.replace(/^https?:\/\//, "")}</span>
              <div className="text-muted">
                {error && !req ? (
                  <span className="text-red-300">{error}</span>
                ) : preparing ? (
                  "Preparing the audio clip…"
                ) : step ? (
                  STAGE_LABEL[step.stage]
                ) : (
                  "Ready"
                )}
                {result && ` · HTTP ${result.httpStatus} · ${Math.round(result.ms)} ms`}
              </div>
              {clipLabel && <div className="pgx-clip">{clipLabel}</div>}
            </>
          ) : (
            <span className="text-muted">Not deployed</span>
          )}
        </Step>

        <Step n={2} title="USDC payment (EIP-3009 signature)" status={payStatus}>
          {req ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="pgx-amount">{formatUsdc(req.amount)}</span>
                <span className="text-muted">USDC on Celo · no gas</span>
              </div>
              <div className="font-mono text-[11px] text-muted">
                {short(result?.payer ?? address ?? "", 4)} →{" "}
                <a className="pgx-link" href={addressUrl(req.payTo)} target="_blank" rel="noreferrer">
                  PAPAGEDON {short(req.payTo, 4)}
                </a>
              </div>
              {error && <div className="text-red-300">{error}</div>}
            </>
          ) : (
            <span className="text-muted">{live ? `Quoted by the gateway. This page refuses anything above ${AEI_MAX_PRICE_USDC} USDC or not paid to the PAPAGEDON wallet.` : "—"}</span>
          )}
        </Step>

        <Step n={3} title="Settlement on Celo" status={txStatus}>
          {settledOk ? (
            <span className="text-muted">Settled by the Celo x402 facilitator</span>
          ) : result?.transaction ? (
            <span className="text-red-300">{result.settleError}</span>
          ) : (
            <span className={result?.settleError ? "text-red-300" : "text-muted"}>{result?.settleError ?? (live ? "The tx hash appears here after settlement" : "—")}</span>
          )}
        </Step>
      </ol>

      {settledOk && result?.transaction && (
        <div className="pgx-receipt" aria-live="polite">
          <div className="pgx-receipt-head">
            <span className="pgx-receipt-check" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <div className="min-w-0 flex-1">
              <div className="pgx-receipt-title">Payment settled</div>
              <div className="pgx-receipt-sub">
                <CeloIcon size={11} /> Celo mainnet · {Math.round(result.ms)} ms end to end
              </div>
            </div>
            <div className="pgx-receipt-amount">
              {result.amountUsdc} <span>USDC</span>
            </div>
          </div>
          <dl className="pgx-receipt-rows">
            <div>
              <dt>From</dt>
              <dd className="font-mono">{short(result.payer ?? "", 6)}</dd>
            </div>
            <div>
              <dt>To</dt>
              <dd className="font-mono">PAPAGEDON {short(result.requirement?.payTo ?? PAPAGEDON_PAYEE, 4)}</dd>
            </div>
            <div>
              <dt>Tx hash</dt>
              <dd className="flex items-center gap-2">
                <span className="truncate font-mono" title={result.transaction}>{short(result.transaction, 10)}</span>
                <CopyButton text={result.transaction} />
              </dd>
            </div>
            {aei && (
              <div>
                <dt>AEI</dt>
                <dd>
                  {aei.tempo?.bpm ? `${aei.tempo.bpm} BPM` : "— BPM"}
                  {aei.signals?.dominantState ? ` · ${aei.signals.dominantState}` : ""}
                  {aei.audio?.durationSeconds ? ` · ${aei.audio.durationSeconds} s analysed` : ""}
                </dd>
              </div>
            )}
          </dl>
          <a className="pgx-btn-gold w-full justify-center" href={txUrl(result.transaction)} target="_blank" rel="noreferrer">
            View on Celoscan
            <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path d="M9 3h4v4M13 3L7.5 8.5M12 9.5V13H3V4h3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </a>
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <button type="button" className="pgx-btn-gold flex-1 justify-center" disabled={!live || busy} onClick={run}>
          {busy && <span className="pgx-spinner pgx-spinner-dark" aria-hidden="true" />}
          {!live ? "Gateway not live" : busy ? (preparing ? "Preparing clip…" : step ? STAGE_LABEL[step.stage] : "Starting…") : !isConnected ? "Connect a wallet to pay" : result ? "Run another paid call" : `Pay ${priceLabel} & run AEI`}
        </button>
        {(result || error) && !busy && (
          <button type="button" className="pg-btn" onClick={clear} title="Clear the result and let this panel collapse">
            Clear
          </button>
        )}
      </div>

      {result && (
        <div className="mt-3">
          <Disclosure label="AEI result JSON" meta={`HTTP ${result.httpStatus}`}>
            <pre className="pgx-json">{JSON.stringify(result.body, null, 2)}</pre>
          </Disclosure>
        </div>
      )}

      <div className="mt-2">
        <Disclosure
          label="On-chain identity"
          meta={
            <span className="pgx-gold-text">
              ERC-8004 #{IDENTITY.erc8004.id.toString()} · Self #{IDENTITY.self.id.toString()}
            </span>
          }
        >
          <div className="grid gap-1.5 pb-1 pt-1">
            {(
              [
                ["erc8004", IDENTITY.erc8004, identity.erc8004Owner],
                ["self", IDENTITY.self, identity.selfOwner],
              ] as const
            ).map(([key, id, owner]) => (
              <div key={key} className="flex items-baseline justify-between gap-2 text-[12px]">
                <span>
                  {id.label} <b>#{id.id.toString()}</b>{" "}
                  <span className={verified(owner) === "verified" ? "text-accent-soft" : "text-subtle"}>
                    {verified(owner) === "verified" ? "✓ owner verified" : verified(owner) === "mismatch" ? "owner mismatch" : ""}
                  </span>
                </span>
                <a className="pgx-link font-mono text-[11px]" href={txUrl(id.tx)} target="_blank" rel="noreferrer">
                  {short(id.tx, 4)} ↗
                </a>
              </div>
            ))}
            <p className="text-[10.5px] text-subtle">Registrations, not payments.</p>
          </div>
        </Disclosure>
      </div>
    </CollapsibleSection>
  );
}
