"use client";

/**
 * Wallet layer for papagedon.com/app, reusing the wagmi + react-query pattern
 * from MEGAPOT-CHECKERS (src/components/online/Web3Provider.tsx), pointed at
 * Celo mainnet (42220). Injected wallets (MetaMask, Rabby, Valora, MiniPay
 * browser) always work; WalletConnect is added when
 * NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is set.
 */
import * as React from "react";
import { WagmiProvider, createConfig, http, injected, type CreateConnectorFn } from "wagmi";
import { celo } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CELO_RPC_URL, WALLETCONNECT_PROJECT_ID } from "@/lib/aei/config";

const connectors: CreateConnectorFn[] = [injected()];
if (WALLETCONNECT_PROJECT_ID) {
  connectors.push(
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      showQrModal: true,
      metadata: {
        name: "PAPAGEDON",
        description: "PAPAGEDON AEI on Celo",
        url: "https://www.papagedon.com/app",
        icons: ["https://www.papagedon.com/papagedon-mark.png"],
      },
    }),
  );
}

export const wagmiConfig = createConfig({
  chains: [celo],
  connectors,
  transports: { [celo.id]: http(CELO_RPC_URL) },
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
