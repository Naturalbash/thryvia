import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "jpepvdkvlifzqzdllpdz.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
export default nextConfig;
