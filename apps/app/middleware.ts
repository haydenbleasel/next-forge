import { authMiddleware } from '@repo/auth/middleware';
import { noseconeConfig, noseconeMiddleware } from '@repo/security/middleware';

const securityHeaders = noseconeMiddleware(noseconeConfig);

export default authMiddleware(() => securityHeaders());

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
