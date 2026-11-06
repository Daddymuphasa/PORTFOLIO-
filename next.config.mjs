// Origins the /app web app talks to from the browser (build-time env).
const originOf = (u) => {
  try {
    return u ? new URL(u).origin : "";
  } catch {
    return "";
  }
};
// AWS-hosted OpenCV 5 vision service (vision-service/), optional.
const visionService = originOf(process.env.NEXT_PUBLIC_VISION_SERVICE_URL);
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
  async rewrites() {
    return [
      {
        source: "/monad",
        destination: "/monad/index.html",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "onnxruntime-node$": false,
        sharp$: false,
      };
    }
    return config;
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
            value: "camera=(self), microphone=(self), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "object-src 'none'",
              join("img-src 'self' data: blob:", monad.img),
              "media-src 'self' blob:",
              join(
                "connect-src 'self' blob:",
                visionService,
                monad.connect,
                "https://huggingface.co",
                "https://cdn-lfs.huggingface.co",
                "https://cdn-lfs-us-1.huggingface.co",
                "https://cas-bridge.xethub.hf.co",
              ),
              join("font-src 'self'", monad.font),
              join("frame-src 'self'", monad.frame),
              join("style-src 'self' 'unsafe-inline'", monad.style),
              "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
