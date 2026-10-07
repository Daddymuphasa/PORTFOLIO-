"use client";

import { useState } from "react";
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

type Clip = { blob: Blob; name: string };

const STAGE_LABEL: Record<PaidCallStep["stage"], string> = {
  requesting: "Calling gateway…",
  quoted: "Quote received",
  signing: "Sign the USDC payment in your wallet…",
  submitting: "Payment signed, running AEI…",
  done: "Done",
};

function Row({ n, title, status, children }: { n: number; title: string; status: "idle" | "busy" | "ok" | "err" | "off"; children: React.ReactNode }) {
  const dot = { idle: "bg-subtle", busy: "bg-steel animate-pulse", ok: "bg-accent", err: "bg-red-400", off: "bg-subtle/50" }[status];
  return (
    <div className="border-t border-line py-2.5 first:border-t-0">
      <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
        {n}. {title}
      </div>
      <div className="text-[13px] leading-snug">{children}</div>
    </div>
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
  const [result, setResult] = useState<PaidCallResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showJson, setShowJson] = useState(true);
  const busy = step !== null && step.stage !== "done" && !error;

  const verified = (owner: string | null) =>
    owner === null ? "unverified" : owner.toLowerCase() === PAPAGEDON_PAYEE.toLowerCase() ? "verified" : "mismatch";

  async function run() {
    setError(null);
    setResult(null);
    setStep(null);
    try {
      if (!live) throw new Error("The paid AEI gateway is not live yet.");
      if (!isConnected || !address) throw new Error("Connect a wallet first.");
      if (chainId !== celo.id) await switchChainAsync({ chainId: celo.id });
      if (!walletClient) throw new Error("Wallet not ready on Celo yet. Try again in a moment.");
      const clip = await getClip();
      if (!clip) throw new Error("Load a track or start a live source first.");
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
      const r = await runPaidCall({ url: endpoint, makeBody, signer, onStep: setStep });
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message.split("\n")[0] : String(e));
    }
  }

  const req = step && "requirement" in step ? step.requirement : result?.requirement ?? null;
  const gatewayStatus = !live ? "off" : error && !req ? "err" : step ? (result ? (result.httpStatus < 400 ? "ok" : "err") : "busy") : "idle";
  const payStatus = !live ? "off" : result?.paid ? (result.settled ? "ok" : "err") : req ? (error ? "err" : "busy") : "idle";
  const txStatus = !live ? "off" : result?.transaction ? (result.settled ? "ok" : "err") : busy ? "busy" : "idle";

  return (
    <section className="pg-panel w-full">
      <header className="mb-2 flex items-center justify-between">
        <h2 className="font-heading text-[15px] font-semibold tracking-tight">Paid AEI call</h2>
        <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${live ? "bg-accent/15 text-accent-soft" : "bg-white/5 text-muted"}`}>
          {live ? "Celo mainnet" : "Gateway not live"}
        </span>
      </header>

      {!live && (
        <p className="mb-2 rounded-md border border-line bg-white/[0.03] p-2.5 text-[12px] leading-snug text-muted">
          No paid AEI gateway is deployed yet, so no call, payment or settlement tx can happen here. Set{" "}
          <code className="text-foreground">NEXT_PUBLIC_AEI_GATEWAY_URL</code> once the x402 gateway is live and this panel goes live with no other change.
        </p>
      )}

      <Row n={1} title="Gateway call" status={gatewayStatus}>
        {live ? (
          <>
            <span className="font-mono text-[12px] text-steel-soft">POST {endpoint.replace(/^https?:\/\//, "")}</span>
            <div className="text-muted">
              {error && !req ? <span className="text-red-300">{error}</span> : step ? STAGE_LABEL[step.stage] : "Ready"}
              {result && ` · HTTP ${result.httpStatus} · ${Math.round(result.ms)} ms`}
            </div>
          </>
        ) : (
          <span className="text-muted">Not deployed</span>
        )}
      </Row>

      <Row n={2} title="Payment" status={payStatus}>
        {req ? (
          <>
            <span className="font-heading text-[18px] font-semibold">{formatUsdc(req.amount)} USDC</span>
            <span className="text-muted"> on Celo · x402 exact (EIP-3009)</span>
            <div className="font-mono text-[11px] text-muted">
              from {short(result?.payer ?? address ?? "", 4)} → <a className="underline decoration-dotted" href={addressUrl(req.payTo)} target="_blank" rel="noreferrer">{short(req.payTo, 4)}</a>
            </div>
            {error && <div className="text-red-300">{error}</div>}
          </>
        ) : (
          <span className="text-muted">{live ? `Quoted by the gateway; this page refuses anything above ${AEI_MAX_PRICE_USDC} USDC or not paid to the PAPAGEDON wallet.` : "—"}</span>
        )}
      </Row>

      <Row n={3} title="Settlement tx" status={txStatus}>
        {result?.transaction ? (
          <>
            <a className="break-all font-mono text-[12px] text-accent-soft underline decoration-dotted" href={txUrl(result.transaction)} target="_blank" rel="noreferrer">
              {result.transaction}
            </a>
            <div className="text-muted">{result.settled ? "Settled on Celo · view on Celoscan ↗" : result.settleError}</div>
          </>
        ) : (
          <span className="text-muted">{result?.settleError ?? (live ? "Appears here after settlement" : "—")}</span>
        )}
      </Row>

      <button className="pg-btn pg-btn-primary mt-1 w-full justify-center" disabled={!live || busy} onClick={run}>
        {!live ? "Gateway not live" : busy ? STAGE_LABEL[step!.stage] : !isConnected ? "Connect a wallet to pay" : "Pay & run AEI call"}
      </button>

      {result && (
        <div className="mt-2">
          <button className="font-mono text-[10px] uppercase tracking-widest text-muted" onClick={() => setShowJson((s) => !s)}>
            {showJson ? "▾" : "▸"} AEI result JSON
          </button>
          {showJson && (
            <pre className="mt-1 max-h-48 overflow-auto rounded-md bg-black/40 p-2 font-mono text-[11px] leading-snug text-foreground/90">
              {JSON.stringify(result.body, null, 2)}
            </pre>
          )}
        </div>
      )}

      <div className="mt-3 border-t border-line pt-2">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">On-chain identity (registrations, not payments)</div>
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
            <a className="font-mono text-[11px] text-steel-soft underline decoration-dotted" href={txUrl(id.tx)} target="_blank" rel="noreferrer">
              {short(id.tx, 4)} ↗
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
