import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: { emotion: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plchldr.co',
      },
      {
        protocol: 'https',
        hostname: 'www.jojaemin.com',
      },
    ],
  },
};
module.exports = nextConfig;

export default nextConfig;
