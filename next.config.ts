import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Match WordPress URLs (/product/slug/) so existing links and SEO keep working.
  trailingSlash: true,
  images: {
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
