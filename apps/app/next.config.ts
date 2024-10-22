import { config, withAnalyzer, withSentry } from '@repo/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = { ...config };

if (process.env.NODE_ENV === 'production') {
  nextConfig.rewrites = async () => [
    {
      source: '/segment-cdn/:path*',
      destination: 'https://cdn.segment.com/:path*',
    },
    {
      source: '/segment-api/:path*',
      destination: 'https://api.segment.io/:path*',
    },
  ];
}

if (process.env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
