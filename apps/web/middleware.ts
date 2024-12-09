import { authMiddleware } from '@repo/auth/middleware';
import { env } from '@repo/env';
import { parseError } from '@repo/observability/error';
import { secure } from '@repo/security';
import { NextResponse } from 'next/server';

export const config = {
  // matcher tells Next.js which routes to run the middleware on. This runs the
  // middleware on all routes except for static assets and Posthog ingest
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};

export default authMiddleware(async (_auth, request) => {
  if (!env.ARCJET_KEY) {
    return NextResponse.next();
  }

  try {
    await secure(
      [
        // See https://docs.arcjet.com/bot-protection/identifying-bots
        'CATEGORY:SEARCH_ENGINE', // Allow search engines
        'CATEGORY:PREVIEW', // Allow preview links to show OG images
        'CATEGORY:MONITOR', // Allow uptime monitoring services
      ],
      request
    );

    return NextResponse.next();
  } catch (error) {
    const message = parseError(error);

    return NextResponse.json({ error: message }, { status: 403 });
  }
});
