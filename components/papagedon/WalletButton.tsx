"use client";

/**
 * PAPAGEDON wallet control for /app: a gold "Connect wallet" button that opens
 * a wallet picker, and a compact account pill once connected (identicon,
 * address, Celo badge, USDC balance, copy, Celoscan, disconnect, and a clear
 * "Switch to Celo" when the wallet is on another network).
 *
 * Wallets come from wagmi: every EIP-6963 wallet the browser announces
 * (MetaMask, Rabby, Coinbase Wallet, ... with their own icons), the plain
 * injected provider when nothing announced itself or it is MiniPay / Valora,
 * and WalletConnect when NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is set.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useConnect, useConnection, useConnectors, useDisconnect, useReadContract, useSwitchChain, type Connector } from "wagmi";
import { celo } from "wagmi/chains";
import { erc20Abi, getAddress } from "viem";
import { USDC_CELO, addressUrl, short } from "@/lib/aei/config";
import { formatUsdc } from "@/lib/aei/paidCall";
import { CeloIcon, Identicon, UsdcIcon, WalletBrandIcon, type WalletBrand } from "./wallet/icons";

type InjectedFlags = {
  isMetaMask?: boolean;
  isMiniPay?: boolean;
  isValora?: boolean;
  isCoinbaseWallet?: boolean;
  isRabby?: boolean;
};

type Entry = {
  key: string;
  connector: Connector;
  name: string;
  brand: WalletBrand;
  icon?: string;
  badge: string;
  hint: string;
};

const brandFromId = (id: string, name: string): WalletBrand => {
  const s = `${id} ${name}`.toLowerCase();
  if (s.includes("metamask")) return "metamask";
  if (s.includes("coinbase")) return "coinbase";
  if (s.includes("rabby")) return "rabby";
  if (s.includes("valora")) return "valora";
  if (s.includes("minipay")) return "minipay";
  if (s.includes("walletconnect")) return "walletconnect";
  return "browser";
};

function useWalletEntries(): { entries: Entry[]; noBrowserWallet: boolean } {
  const connectors = useConnectors();
  const [flags, setFlags] = useState<InjectedFlags | null>(null);
  useEffect(() => {
    setFlags(((window as unknown as { ethereum?: InjectedFlags }).ethereum ?? null) as InjectedFlags | null);
  }, [connectors]);

  return useMemo(() => {
    const announced = connectors.filter((c) => c.type === "injected" && c.id !== "injected");
    const generic = connectors.find((c) => c.id === "injected");
    const wc = connectors.find((c) => c.type === "walletConnect");
    const entries: Entry[] = announced.map((c) => ({
      key: c.uid,
      connector: c,
      name: c.name,
      brand: brandFromId(c.id, c.name),
      icon: c.icon,
      badge: "Installed",
      hint: "Browser extension",
    }));
    const mobileInjected = Boolean(flags?.isMiniPay || flags?.isValora);
    if (generic && flags && (announced.length === 0 || mobileInjected)) {
      const brand: WalletBrand = flags.isMiniPay
        ? "minipay"
        : flags.isValora
          ? "valora"
          : flags.isCoinbaseWallet
            ? "coinbase"
            : flags.isRabby
              ? "rabby"
              : flags.isMetaMask
                ? "metamask"
                : "browser";
      const names: Record<WalletBrand, string> = {
        minipay: "MiniPay",
        valora: "Valora",
        coinbase: "Coinbase Wallet",
        rabby: "Rabby",
        metamask: "MetaMask",
        walletconnect: "WalletConnect",
        browser: "Browser wallet",
      };
      entries.unshift({ key: generic.uid, connector: generic, name: names[brand], brand, badge: "Detected", hint: mobileInjected ? "Celo wallet in this browser" : "Injected wallet" });
    }
    if (wc) {
      entries.push({ key: wc.uid, connector: wc, name: "WalletConnect", brand: "walletconnect", badge: "QR · mobile", hint: "Valora, MiniPay and other mobile wallets" });
    }
    return { entries, noBrowserWallet: flags === null && announced.length === 0 };
  }, [connectors, flags]);
}

function WalletIcon({ entry, size = 32 }: { entry: Entry; size?: number }) {
  const [broken, setBroken] = useState(false);
  if (entry.icon && !broken && entry.icon.startsWith("data:")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={entry.icon} alt="" width={size} height={size} className="pgx-wallet-img" onError={() => setBroken(true)} />;
  }
  return <WalletBrandIcon brand={entry.brand} size={size} />;
}

function friendlyError(e: Error | null): string | null {
  if (!e) return null;
  const m = e.message.split("\n")[0];
  if (/reject|denied|cancel/i.test(m)) return "Request cancelled in the wallet.";
  if (/already pending/i.test(m)) return "Your wallet already has a request open. Check the wallet window.";
  return m;
}

function WalletModal({ onClose }: { onClose: () => void }) {
  const { entries, noBrowserWallet } = useWalletEntries();
  const { mutate: connect, isPending, variables, error, reset } = useConnect();
  const pendingUid = isPending ? (variables?.connector as Connector | undefined)?.uid : undefined;
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reset();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLButtonElement>("button.pgx-wallet-option")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, reset]);

  return createPortal(
    <div className="pgx-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} className="pgx-modal" role="dialog" aria-modal="true" aria-labelledby="pgx-wallet-title">
        <header className="pgx-modal-head">
          <img src="/papagedon-mark.png" alt="" className="pgx-modal-mark" />
          <div className="min-w-0 flex-1">
            <h2 id="pgx-wallet-title" className="pgx-modal-title">Connect a wallet</h2>
            <p className="pgx-modal-sub">
              <CeloIcon size={12} /> Celo mainnet · you sign each AEI payment; no gas needed
            </p>
          </div>
          <button type="button" className="pgx-icon-btn" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </header>

        <div className="pgx-wallet-list">
          {entries.map((w) => {
            const pending = pendingUid === w.connector.uid;
            return (
              <button
                key={w.key}
                type="button"
                className={`pgx-wallet-option ${pending ? "is-pending" : ""}`}
                disabled={isPending}
                onClick={() => connect({ connector: w.connector, chainId: celo.id }, { onSuccess: onClose })}
              >
                <span className="pgx-wallet-icon"><WalletIcon entry={w} /></span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="pgx-wallet-name">{w.name}</span>
                  <span className="pgx-wallet-hint">{pending ? `Approve in ${w.name}…` : w.hint}</span>
                </span>
                {pending ? <span className="pgx-spinner" aria-label="Connecting" /> : <span className={`pgx-badge ${w.badge === "QR · mobile" ? "" : "pgx-badge-green"}`}>{w.badge}</span>}
              </button>
            );
          })}
          {entries.length === 0 && (
            <div className="pgx-wallet-empty">
              <WalletBrandIcon brand="browser" size={36} />
              <p>{noBrowserWallet ? "No wallet found in this browser." : "Looking for wallets…"}</p>
            </div>
          )}
        </div>

        {friendlyError(error) && <p className="pgx-modal-error" role="alert">{friendlyError(error)}</p>}

        <footer className="pgx-modal-foot">
          <span>New to Celo wallets?</span>
          <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">MetaMask</a>
          <a href="https://valora.xyz" target="_blank" rel="noreferrer">Valora</a>
          <a href="https://www.opera.com/products/minipay" target="_blank" rel="noreferrer">MiniPay</a>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

const USDC_TOKEN = getAddress(USDC_CELO);

function useUsdcBalance(address?: `0x${string}`) {
  const { data } = useReadContract({
    // USDC_CELO's literal has a non-standard checksum that viem rejects for
    // reads; normalise it here (display-only, the payment path is untouched).
    address: USDC_TOKEN,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: celo.id,
    query: { enabled: Boolean(address), refetchInterval: 15_000 },
  });
  return typeof data === "bigint" ? data : null;
}

function AccountMenu({ address, connectorName, usdc, onClose }: { address: `0x${string}`; connectorName: string; usdc: bigint | null; onClose: () => void }) {
  const { mutate: disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked */
    }
  }, [address]);
  return (
    <div className="pgx-menu" role="menu">
      <div className="pgx-menu-head">
        <Identicon address={address} size={40} />
        <div className="min-w-0">
          <div className="pgx-menu-addr">{short(address, 6)}</div>
          <div className="pgx-menu-sub">
            <CeloIcon size={11} /> Celo mainnet · {connectorName}
          </div>
        </div>
      </div>
      <div className="pgx-menu-balance">
        <UsdcIcon size={18} />
        <span className="flex-1">USDC</span>
        <b>{usdc === null ? "…" : formatUsdc(usdc)}</b>
      </div>
      <button type="button" role="menuitem" className="pgx-menu-item" onClick={copy}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="5" y="5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M3 10.5V4a1 1 0 0 1 1-1h6.5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
        {copied ? "Copied" : "Copy address"}
      </button>
      <a role="menuitem" className="pgx-menu-item" href={addressUrl(address)} target="_blank" rel="noreferrer" onClick={onClose}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M9 3h4v4M13 3L7.5 8.5M12 9.5V13H3V4h3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        View on Celoscan
      </a>
      <button
        type="button"
        role="menuitem"
        className="pgx-menu-item pgx-menu-danger"
        onClick={() => {
          onClose();
          disconnect();
        }}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M6 3H3.5v10H6M10 5l3 3-3 3M13 8H6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        Disconnect
      </button>
    </div>
  );
}

export default function WalletButton() {
  const { address, isConnected, isConnecting, isReconnecting, chainId, connector } = useConnection();
  const { mutate: switchChain, isPending: switching } = useSwitchChain();
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const usdc = useUsdcBalance(isConnected ? address : undefined);
  const closeModal = useCallback(() => setModal(false), []);

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setMenu(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  if (!isConnected || !address) {
    return (
      <>
        <button type="button" className="pgx-btn-gold" onClick={() => setModal(true)} disabled={isReconnecting}>
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><rect x="2.5" y="5" width="15" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M2.5 8h12.5a2.5 2.5 0 0 1 2.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><circle cx="14" cy="11.5" r="1.2" fill="currentColor" /></svg>
          {isReconnecting || isConnecting ? "Connecting…" : "Connect wallet"}
        </button>
        {modal && <WalletModal onClose={closeModal} />}
      </>
    );
  }

  const wrongChain = chainId !== celo.id;
  return (
    <div ref={wrap} className="relative flex items-center gap-2">
      {wrongChain && (
        <button type="button" className="pgx-btn-warn" onClick={() => switchChain({ chainId: celo.id })} disabled={switching}>
          <span className="pgx-warn-dot" />
          {switching ? "Switching…" : "Switch to Celo"}
        </button>
      )}
      <button type="button" className={`pgx-pill ${menu ? "is-open" : ""}`} onClick={() => setMenu((m) => !m)} aria-haspopup="menu" aria-expanded={menu} data-pg-wallet-pill>
        <Identicon address={address} size={22} />
        <span className="pgx-pill-addr">{short(address, 4)}</span>
        {usdc !== null && !wrongChain && (
          <span className="pgx-pill-usdc">
            <UsdcIcon size={13} />
            {formatUsdc(usdc)}
          </span>
        )}
        <span className={`pgx-chain ${wrongChain ? "is-wrong" : ""}`} title={wrongChain ? "Wrong network" : "Celo mainnet"}>
          <CeloIcon size={13} />
          <span className="pgx-chain-name">{wrongChain ? "Wrong network" : "Celo"}</span>
        </span>
      </button>
      {menu && <AccountMenu address={address} connectorName={connector?.name ?? "Wallet"} usdc={usdc} onClose={() => setMenu(false)} />}
    </div>
  );
}

