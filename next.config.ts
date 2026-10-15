import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  images: {
    /* Next 16 requires the allowlist, and anything off it is coerced to the
       nearest entry without comment. 60 is for the veiled contact backdrop:
       it sits at 20% through a gradient and is graded down besides, so the
       detail a higher setting buys is never visible. */
    qualities: [60, 75],
  },
  partialPrefetching: true,
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
