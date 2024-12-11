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
  contentSecurityPolicy: false,
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

