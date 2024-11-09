import arcjet, { detectBot } from '@arcjet/next';
import { clerkMiddleware } from '@clerk/nextjs/server';
import { env } from '@repo/env';
import { NextResponse } from 'next/server';

export const config = {
  // matcher tells Next.js which routes to run the middleware on. This runs the
  // middleware on all routes except for static assets and Posthog ingest
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};

const aj = arcjet({
  // Get your site key from https://app.arcjet.com
  key: env.ARCJET_KEY,
  rules: [
    detectBot({
      mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
      // Block all bots except search engine crawlers and preview link
      // generators. See the full list of bots for other options:
      // https://docs.arcjet.com/bot-protection/identifying-bots
      allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
    }),
  ],
});

export default clerkMiddleware(async (auth, request) => {
  const decision = await aj.protect(request);

  if (
    // If this deny comes from a bot rule then block the request. You can
    // customize this logic to fit your needs e.g. changing the status code.
    decision.isDenied() &&
    decision.reason.isBot()
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  return NextResponse.next();
});
