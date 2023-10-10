import { createSecureHeaders } from 'next-secure-headers';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import { createContentlayerPlugin } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
  headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders({
          // HSTS Preload: https://hstspreload.org/
          forceHTTPSRedirect: [
            true,
            { maxAge: 63072000, includeSubDomains: true, preload: true },
          ],
        }),
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/legal',
        destination: '/legal/privacy',
        permanent: true,
      },
    ];
  },

  // Silence, contentlayer
  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
});

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer()(nextConfig)
  : withSentryConfig(
      withContentlayer(nextConfig),
      {
        /*
         * For all available options, see:
         * https://github.com/getsentry/sentry-webpack-plugin#options
         */

        // Suppresses source map uploading logs during build
        silent: true,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      },
      {
        /*
         * For all available options, see:
         * https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
         */

        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,

        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
        tunnelRoute: '/monitoring',

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,
      }
    );
