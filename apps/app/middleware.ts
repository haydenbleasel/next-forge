import { authMiddleware } from '@repo/auth/middleware';
import { env } from '@repo/env';
import {
  noseconeDefaults,
  noseconeMiddleware,
  withVercelToolbar,
  type NoseconeOptions
} from '@repo/security/middleware';

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
const noseconeOptions: NoseconeOptions = {
  ...noseconeDefaults,
  contentSecurityPolicy: {
    ...noseconeDefaults.contentSecurityPolicy,
    directives: {
      ...noseconeDefaults.contentSecurityPolicy.directives,
      scriptSrc: [
        // We have to use unsafe-inline because next-themes and Vercel Analytics
        // do not support nonce
        // https://github.com/pacocoursey/next-themes/issues/106
        // https://github.com/vercel/analytics/issues/122
        //...noseconeDefaults.contentSecurityPolicy.directives.scriptSrc,
        "'self'",
        "'unsafe-inline'",
        "https://www.googletagmanager.com",
        "https://*.clerk.accounts.dev",
        "https://va.vercel-scripts.com",
      ],
      connectSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.connectSrc,
        "https://*.clerk.accounts.dev",
        "https://*.google-analytics.com",
        "https://clerk-telemetry.com",
      ],
      workerSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.workerSrc,
        "blob:",
        "https://*.clerk.accounts.dev"
      ],
      imgSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.imgSrc,
        "https://img.clerk.com"
      ],
      objectSrc: [
        ...noseconeDefaults.contentSecurityPolicy.directives.objectSrc,
      ],
      // We only set this in production because the server may be started
      // without HTTPS
      upgradeInsecureRequests: process.env.NODE_ENV === "production",
    },
  },
}

// Add Vercel toolbar compatible options if we're in a preview environment
const noseconeConfig = (env.NODE_ENV === 'development' && env.FLAGS_SECRET) ? withVercelToolbar(noseconeOptions) : noseconeOptions;

const securityHeaders = noseconeMiddleware(noseconeConfig);

export default authMiddleware(() => {
  return securityHeaders();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

