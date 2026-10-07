/**
 * Local wallet / network / token marks for the /app wallet UI. Inline SVG, so
 * nothing is hotlinked. Real wallets that announce themselves over EIP-6963
 * (MetaMask, Rabby, Coinbase Wallet, ...) supply their own icon, which is used
 * instead; these are the fallbacks.
 */
import type { ReactElement } from "react";

type IconProps = { size?: number; className?: string };
const box = (size: number, className: string | undefined, children: ReactElement | ReactElement[], viewBox = "0 0 32 32") => (
  <svg width={size} height={size} viewBox={viewBox} className={className} aria-hidden="true">
    {children}
  </svg>
);

export function MetaMaskIcon({ size = 28, className }: IconProps) {
  return box(size, className, [
    <rect key="b" width="32" height="32" rx="8" fill="#FFF4E8" />,
    <path key="1" d="M25.6 6.5 17.6 12.4l1.5-3.5z" fill="#E2761B" />,
    <path key="2" d="M6.4 6.5l7.9 6-1.4-3.6z" fill="#E4761B" />,
    <path key="3" d="M22.7 20.3l-2.1 3.3 4.6 1.3 1.3-4.5zM5.6 20.4l1.3 4.5 4.6-1.3-2.1-3.3z" fill="#E4761B" />,
    <path key="4" d="M11.2 14.7 9.9 16.6l4.5.2-.2-4.9zM20.8 14.7l-3.1-2.9-.1 5 4.5-.2z" fill="#E4761B" />,
    <path key="5" d="M11.5 23.6l2.7-1.3-2.4-1.8zM17.8 22.3l2.7 1.3-.3-3.1z" fill="#E4761B" />,
    <path key="6" d="M20.5 23.6l-2.7-1.3.2 1.8v.8zM11.5 23.6l2.5 1.3v-.8l.2-1.8z" fill="#D7C1B3" />,
    <path key="7" d="M14.1 19.2l-2.3-.7 1.6-.7zM17.9 19.2l.7-1.4 1.6.7z" fill="#233447" />,
    <path key="8" d="M11.5 23.6l.4-3.3-2.5.1zM20.1 20.3l.4 3.3 2.1-3.2zM22 16.6l-4.5.2.4 2.4.7-1.4 1.6.7zM11.8 18.5l1.6-.7.7 1.4.4-2.4-4.5-.2z" fill="#CD6116" />,
    <path key="9" d="M9.9 16.6l1.9 3.7-.1-1.8zM20.2 18.5l-.1 1.8 1.9-3.7zM14.4 16.8l-.4 2.4.5 2.8.1-3.7zM17.6 16.8l-.2 1.5.1 3.7.5-2.8z" fill="#E4751F" />,
    <path key="10" d="M18 19.2l-.5 2.8.4.3 2.4-1.8.1-1.8zM11.8 18.5l.1 1.8 2.4 1.8.3-.3-.5-2.8z" fill="#F6851B" />,
  ]);
}

export function CoinbaseIcon({ size = 28, className }: IconProps) {
  return box(size, className, [
    <rect key="b" width="32" height="32" rx="8" fill="#0052FF" />,
    <circle key="c" cx="16" cy="16" r="9" fill="#fff" />,
    <rect key="s" x="12.8" y="12.8" width="6.4" height="6.4" rx="1.2" fill="#0052FF" />,
  ]);
}

export function WalletConnectIcon({ size = 28, className }: IconProps) {
  return box(size, className, [
    <rect key="b" width="32" height="32" rx="8" fill="#3B99FC" />,
    <path
      key="w"
      d="M9.6 12.6c3.5-3.4 9.3-3.4 12.8 0l.4.4c.2.2.2.5 0 .6l-1.4 1.4c-.1.1-.2.1-.3 0l-.6-.6c-2.5-2.4-6.4-2.4-8.9 0l-.6.6c-.1.1-.2.1-.3 0l-1.4-1.4c-.2-.2-.2-.5 0-.6zm15.8 2.9 1.3 1.2c.2.2.2.5 0 .6l-5.7 5.6c-.2.2-.5.2-.6 0l-4-4c0-.1-.1-.1-.2 0l-4 4c-.2.2-.5.2-.6 0l-5.7-5.6c-.2-.2-.2-.5 0-.6l1.3-1.2c.2-.2.5-.2.6 0l4 4c.1.1.1.1.2 0l4-4c.2-.2.5-.2.6 0l4 4c.1.1.1.1.2 0l4-4c.2-.2.5-.2.6 0z"
      fill="#fff"
    />,
  ]);
}

export function ValoraIcon({ size = 28, className }: IconProps) {
  return box(size, className, [
    <defs key="d">
      <linearGradient id="pgx-valora" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#35D07F" />
        <stop offset="1" stopColor="#1B9E5A" />
      </linearGradient>
    </defs>,
    <rect key="b" width="32" height="32" rx="8" fill="url(#pgx-valora)" />,
    <path key="v" d="M9 10h3.4l3.6 9.2L19.6 10H23l-5.4 12.5h-3.2z" fill="#fff" />,
  ]);
}

export function MiniPayIcon({ size = 28, className }: IconProps) {
  return box(size, className, [
    <rect key="b" width="32" height="32" rx="8" fill="#0B0B0B" />,
    <path key="m" d="M8.5 22V10.5h2.8l4.7 6.4 4.7-6.4h2.8V22h-3v-6.5L16 20.8l-4.5-5.3V22z" fill="#C8FF6F" />,
  ]);
}

export function RabbyIcon({ size = 28, className }: IconProps) {
  return box(size, className, [
    <rect key="b" width="32" height="32" rx="8" fill="#7084FF" />,
    <path key="r" d="M7.5 18.5c0-4.7 4.5-8.2 9.6-8.2 4.3 0 7.4 2.5 7.4 5.3 0 2.2-1.9 3.6-4.6 3.6h-5.1c-.9 0-1.4.9-.9 1.6l1 1.4c-4.4 0-7.4-1.4-7.4-3.7z" fill="#fff" />,
  ]);
}

export function BrowserWalletIcon({ size = 28, className }: IconProps) {
  return box(size, className, [
    <rect key="b" width="32" height="32" rx="8" fill="#13291D" stroke="#D9B45A" strokeOpacity=".5" />,
    <rect key="w" x="8" y="10.5" width="16" height="12" rx="2.5" fill="none" stroke="#E7C66E" strokeWidth="1.6" />,
    <path key="f" d="M8 13.5h13.5a2.5 2.5 0 0 1 2.5 2.5" fill="none" stroke="#E7C66E" strokeWidth="1.6" />,
    <circle key="c" cx="20" cy="17.5" r="1.3" fill="#E7C66E" />,
  ]);
}

/** Celo network mark (the two-ring logo, in Celo yellow). */
export function CeloIcon({ size = 16, className }: IconProps) {
  return box(
    size,
    className,
    [
      <circle key="b" cx="12" cy="12" r="12" fill="#FCFF52" />,
      <circle key="o1" cx="10.3" cy="13.7" r="4.6" fill="none" stroke="#0B0B0B" strokeWidth="1.6" />,
      <circle key="o2" cx="13.7" cy="10.3" r="4.6" fill="none" stroke="#0B0B0B" strokeWidth="1.6" />,
    ],
    "0 0 24 24",
  );
}

export function UsdcIcon({ size = 16, className }: IconProps) {
  return box(
    size,
    className,
    [
      <circle key="b" cx="12" cy="12" r="12" fill="#2775CA" />,
      <path key="r" d="M7.6 6.4a7 7 0 0 0 0 11.2M16.4 6.4a7 7 0 0 1 0 11.2" fill="none" stroke="#fff" strokeWidth="1.3" />,
      <path
        key="s"
        d="M14.2 13.6c0-1.2-.7-1.6-2.2-1.8-1-.2-1.3-.4-1.3-.9s.4-.8 1.1-.8c.6 0 1 .2 1.2.8h1.1c-.1-.9-.7-1.5-1.6-1.7v-.9h-.9v.9c-1 .1-1.7.8-1.7 1.7 0 1.1.7 1.5 2.1 1.7 1 .2 1.4.4 1.4 1s-.5.9-1.2.9c-.9 0-1.2-.4-1.3-.9H9.8c.1 1 .8 1.6 1.8 1.8v.9h.9v-.9c1-.1 1.7-.8 1.7-1.8z"
        fill="#fff"
      />,
    ],
    "0 0 24 24",
  );
}

/** Deterministic 5x5 mirrored identicon from an address, in PAPAGEDON greens and golds. */
export function Identicon({ address, size = 24, className }: { address: string; size?: number; className?: string }) {
  const hex = address.toLowerCase().replace(/^0x/, "").padEnd(40, "0");
  const byte = (i: number) => parseInt(hex.slice((i * 2) % 40, (i * 2) % 40 + 2), 16);
  const hue = 35 + (byte(0) / 255) * 110; // gold (35) .. green (145)
  const fg = `hsl(${hue.toFixed(0)} 62% 58%)`;
  const fg2 = `hsl(${((hue + 40) % 360).toFixed(0)} 45% 40%)`;
  const cells: ReactElement[] = [];
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 3; x++) {
      const v = byte(1 + y * 3 + x);
      if (v % 3 === 0) continue;
      const fill = v % 3 === 1 ? fg : fg2;
      cells.push(<rect key={`${x}-${y}`} x={x * 4 + 2} y={y * 4 + 2} width="4" height="4" fill={fill} />);
      if (x < 2) cells.push(<rect key={`m${x}-${y}`} x={(4 - x) * 4 + 2} y={y * 4 + 2} width="4" height="4" fill={fill} />);
    }
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`pgx-identicon ${className ?? ""}`} aria-hidden="true">
      <rect width="24" height="24" fill="#0E2318" />
      {cells}
    </svg>
  );
}

export type WalletBrand = "metamask" | "coinbase" | "walletconnect" | "valora" | "minipay" | "rabby" | "browser";

export function WalletBrandIcon({ brand, size = 28 }: { brand: WalletBrand; size?: number }) {
  switch (brand) {
    case "metamask":
      return <MetaMaskIcon size={size} />;
    case "coinbase":
      return <CoinbaseIcon size={size} />;
    case "walletconnect":
      return <WalletConnectIcon size={size} />;
    case "valora":
      return <ValoraIcon size={size} />;
    case "minipay":
      return <MiniPayIcon size={size} />;
    case "rabby":
      return <RabbyIcon size={size} />;
    default:
      return <BrowserWalletIcon size={size} />;
  }
}
