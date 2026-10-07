"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { celo } from "wagmi/chains";
import { short } from "@/lib/aei/config";

/** Connect / switch-to-Celo / disconnect, modelled on MEGAPOT-CHECKERS WalletButton. */
export default function WalletButton() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();
  const [open, setOpen] = useState(false);

  if (!isConnected) {
    return (
      <div className="relative">
        <button className="pg-btn pg-btn-primary" disabled={isPending} onClick={() => setOpen((o) => !o)}>
          {isPending ? "Connecting…" : "Connect wallet"}
        </button>
        {open && (
          <div className="absolute right-0 z-30 mt-2 w-60 rounded-lg border border-line bg-panel/95 p-2 shadow-card backdrop-blur">
            {connectors.map((c) => (
              <button
                key={c.uid}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-white/5"
                onClick={() => {
                  setOpen(false);
                  connect({ connector: c, chainId: celo.id });
                }}
              >
                {c.id === "injected" ? "Browser wallet (MetaMask, Rabby, Valora…)" : c.name}
              </button>
            ))}
            {connectors.length === 1 && (
              <p className="px-3 pb-1 pt-2 text-[11px] leading-snug text-subtle">
                WalletConnect appears here once NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is set.
              </p>
            )}
            {error && <p className="px-3 pt-1 text-[11px] text-red-300">{error.message.split("\n")[0]}</p>}
          </div>
        )}
      </div>
    );
  }

  if (chainId !== celo.id) {
    return (
      <button className="pg-btn pg-btn-warn" disabled={switching} onClick={() => switchChain({ chainId: celo.id })}>
        {switching ? "Switching…" : "Switch to Celo"}
      </button>
    );
  }

  return (
    <button className="pg-btn" title="Disconnect" onClick={() => disconnect()}>
      <span className="inline-block h-2 w-2 rounded-full bg-accent" /> Celo · {short(address ?? "", 4)}
    </button>
  );
}
