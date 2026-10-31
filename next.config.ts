import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  // Match WordPress URLs (/product/slug/) so existing links and SEO keep working.
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      // Current WordPress media. Swap for the Azure CDN host once images move to Blob Storage.
      new URL("https://www.sblawnsystems.com/wp-content/uploads/**"),
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
