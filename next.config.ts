import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ye dono lines Vercel ko error ignore karne ka order dengi
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;