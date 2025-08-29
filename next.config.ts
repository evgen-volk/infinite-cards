import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["*"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // images: {
  //   domains: ["images.unsplash.com", "static.hanos.nl", "www.opnminded.com"],
  //   remotePatterns: [
  //     new URL("https://images.unsplash.com"),
  //     new URL("https://static.hanos.nl"),
  //     new URL("https://www.opnminded.com"),
  //     new URL("https://upload.wikimedia.org/**"),
  //   ],
  // },
};

export default nextConfig;
