import { withContentCollections } from '@content-collections/next';
import { config, withAnalyzer, withSentry } from '@repo/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = { ...config };

if (process.env.NODE_ENV === 'production') {
  const redirects: NextConfig['redirects'] = async () => [
    {
      source: '/legal',
      destination: '/legal/privacy',
      statusCode: 301,
    },
  ];

  nextConfig.redirects = redirects;
}

if (process.env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (process.env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default withContentCollections(nextConfig);
