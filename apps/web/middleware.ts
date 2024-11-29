import { authMiddleware } from '@repo/auth/middleware';
import arcjet, { detectBot } from '@repo/security';
import { NextResponse } from 'next/server';

export const config = {
  // matcher tells Next.js which routes to run the middleware on. This runs the
  // middleware on all routes except for static assets and Posthog ingest
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};

const aj = arcjet.withRule(
  detectBot({
    mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      'CATEGORY:SEARCH_ENGINE', // Allow search engines
      'CATEGORY:PREVIEW', // Allow preview links to show OG images
      'CATEGORY:MONITOR', // Allow uptime monitoring services
    ],
  })
);

export default authMiddleware(async (_auth, request) => {
  const decision = await aj.protect(request);

  // This returns a generic error message, but you could also redirect or show a
  // custom error page depending on the reason for the denial
  if (decision.isDenied()) {
    console.warn('Arcjet denied request', decision);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  return NextResponse.next();
});
