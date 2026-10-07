/**
 * PAPAGEDON AEI on Celo mainnet: public addresses and the paid-gateway config.
 * Nothing here is secret. The gateway itself is configured with
 * NEXT_PUBLIC_AEI_GATEWAY_URL; when it is empty the UI shows "not live".
 */
export const CELO_CHAIN_ID = 42220;
export const CELO_NETWORK = "eip155:42220";
export const CELOSCAN = "https://celoscan.io";

/** Native USDC on Celo mainnet (6 decimals, EIP-3009). */
export const USDC_CELO = "0xcEBA9300f2b948710d2653dD7B07f33A8B32118C" as const;
export const USDC_DECIMALS = 6;

/** Owner wallet of ERC-8004 agent 9882 and Self Agent ID 192; the only accepted payTo. */
export const PAPAGEDON_PAYEE = "0x9A47cC17077ea358052FF6233d8aBEe0041E35ed" as const;

export const IDENTITY = {
  erc8004: {
    label: "ERC-8004 agent",
    id: BigInt(9882),
    registry: "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432" as const,
    tx: "0x981ce3b29c809802ec90d99c1c0748ff11f79990603450c264930684572b7cc5",
  },
  self: {
    label: "Self Agent ID",
    id: BigInt(192),
    registry: "0xaC3DF9ABf80d0F5c020C06B04Cced27763355944" as const,
    tx: "0xc73d799dc042dc53545c4ab361fc58fef3ed1e6023eadb13d06dea20ca85b997",
    agentAddress: "0x9B91D60F267029bc7b527bDC29f188589E0047fC" as const,
  },
} as const;

const trimSlash = (s: string) => s.replace(/\/+$/, "");

export const AEI_GATEWAY_URL = trimSlash(process.env.NEXT_PUBLIC_AEI_GATEWAY_URL ?? "");
export const AEI_ENDPOINT_PATH = process.env.NEXT_PUBLIC_AEI_ENDPOINT_PATH || "/v1/aei/signals";
/** Hard ceiling the UI will ever let a wallet sign for one call, in USDC. */
export const AEI_MAX_PRICE_USDC = process.env.NEXT_PUBLIC_AEI_MAX_PRICE_USDC || "0.05";
export const CELO_RPC_URL = process.env.NEXT_PUBLIC_CELO_RPC_URL || "https://forno.celo.org";
export const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

/**
 * "same-origin" means the gateway is this site's own /v1/aei/signals route
 * (app/v1/aei/signals/route.ts), so production and preview deployments each
 * call themselves. A full URL points at a separate gateway.
 */
export const AEI_SAME_ORIGIN = AEI_GATEWAY_URL === "same-origin";
export const aeiEndpoint = () =>
  AEI_SAME_ORIGIN ? AEI_ENDPOINT_PATH : AEI_GATEWAY_URL ? `${AEI_GATEWAY_URL}${AEI_ENDPOINT_PATH}` : "";
export const txUrl = (hash: string) => `${CELOSCAN}/tx/${hash}`;
export const addressUrl = (a: string) => `${CELOSCAN}/address/${a}`;
export const short = (s: string, n = 6) => (s.length > 2 * n + 2 ? `${s.slice(0, n + 2)}…${s.slice(-n)}` : s);
