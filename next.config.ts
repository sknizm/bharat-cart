import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all domains
      },
    ],
  },
  experimental: {
    optimizeCss: false, // disable LightningCSS, fallback to PostCSS
  },
};

export default nextConfig;
