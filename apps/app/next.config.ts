import { env } from '@/env';
import { withToolbar } from '@repo/feature-flags/lib/toolbar';
import { config, withAnalyzer, withSentry } from '@repo/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withToolbar({ ...config });

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
