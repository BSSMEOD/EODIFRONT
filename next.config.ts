import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: { emotion: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.edaily.co.kr',
      },
    ],
  },
};
module.exports = nextConfig;

export default nextConfig;
