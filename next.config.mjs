// Origins the /app web app talks to from the browser (build-time env).
const originOf = (u) => {
  try {
    return u ? new URL(u).origin : "";
  } catch {
    return "";
  }
};
const celoRpc = originOf(process.env.NEXT_PUBLIC_CELO_RPC_URL) || "https://forno.celo.org";
const aeiGateway = originOf(process.env.NEXT_PUBLIC_AEI_GATEWAY_URL);
const walletConnect = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  ? {
      connect: [
        "https://*.walletconnect.com", "wss://*.walletconnect.com",
        "https://*.walletconnect.org", "wss://*.walletconnect.org",
        "https://*.reown.com", "wss://*.reown.com", "https://*.web3modal.org",
      ],
      img: ["https://*.walletconnect.com", "https://*.reown.com", "https://*.web3modal.org"],
      frame: ["https://verify.walletconnect.com", "https://verify.walletconnect.org", "https://*.reown.com"],
      font: ["https://fonts.reown.com"],
    }
  : { connect: [], img: [], frame: [], font: [] };
// Hosts the static Monad demo (/monad) calls from the browser: Monad testnet RPC,
// Alchemy RPC, Dynamic wallet auth, Envio indexer.
const monad = {
  connect: [
    "https://testnet-rpc.monad.xyz", "wss://testnet-rpc.monad.xyz",
    "https://rpc.monad.xyz", "https://rpc1.monad.xyz", "https://*.monad.xyz", "wss://*.monad.xyz",
    "https://*.g.alchemy.com", "wss://*.g.alchemy.com",
    "https://*.dynamicauth.com", "wss://*.dynamicauth.com",
    "https://*.dynamic.xyz", "wss://*.dynamic.xyz",
    "https://*.dynamic-static-assets.com", "https://dynamic-static-assets.com",
    "https://*.envio.dev", "wss://*.envio.dev",
    "https://*.walletconnect.org", "wss://*.walletconnect.org",
    "https://*.walletconnect.com", "wss://*.walletconnect.com",
  ],
  img: ["https://*.dynamic.xyz", "https://*.dynamic-static-assets.com", "https://dynamic-static-assets.com", "https://*.walletconnect.com"],
  frame: ["https://*.dynamicauth.com", "https://*.dynamic.xyz", "https://verify.walletconnect.com", "https://verify.walletconnect.org"],
  style: ["https://*.dynamic.xyz"],
  font: ["https://fonts.reown.com"],
};
const join = (...parts) => parts.flat().filter(Boolean).join(" ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pages use plain <img>; skip the image optimizer so /_next/image is not a surface.
  images: { unoptimized: true },
  webpack(config) {
    // wagmi's connector barrel lazy-imports optional wallet SDKs that /app never
    // uses (only injected + WalletConnect). Stub the ones that aren't installed so
    // webpack can resolve the barrel; they are never loaded at runtime.
    const unusedOptional = [
      "@coinbase/wallet-sdk",
      "@metamask/connect-evm",
      "@safe-global/safe-apps-provider",
      "@safe-global/safe-apps-sdk",
      "accounts",
      "@x402/svm/exact/client",
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      ...Object.fromEntries(unusedOptional.map((m) => [m, false])),
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/monad",
        destination: "/monad/index.html",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              join("img-src 'self' data: blob:", walletConnect.img, monad.img),
              "media-src 'self' blob:",
              join("connect-src 'self' blob:", celoRpc, aeiGateway, walletConnect.connect, monad.connect),
              join("font-src 'self'", walletConnect.font, monad.font),
              join("frame-src 'self'", walletConnect.frame, monad.frame),
              join("style-src 'self' 'unsafe-inline'", monad.style),
              "script-src 'self' 'unsafe-inline'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
