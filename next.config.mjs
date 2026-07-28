/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js / R3F ship ES modules that Next transpiles cleanly with this flag.
  transpilePackages: ["three"],
};

export default nextConfig;
