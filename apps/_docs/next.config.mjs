import { createMDX } from 'fumadocs-mdx/next';

const withMdx = createMDX();

/** @type {import('next').NextConfig} */
const config = {
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

export default withMdx(config);
