import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'img.logo.dev',
        protocol: 'https',
      },
      {
        hostname: 'github.com',
        protocol: 'https',
      },
    ],
  },
};

export default config;
