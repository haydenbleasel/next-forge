import arcjet, {
  type ArcjetBotCategory,
  type ArcjetWellKnownBot,
  detectBot,
  request,
  shield,
} from '@arcjet/next';
import { env } from '@repo/env';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '@repo/database';

// Re-export the rules to simplify imports inside handlers
export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
  request,
} from '@arcjet/next';

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  prefix: "next-forge",
})


// Create a base Arcjet instance which can be imported and extended in each route.
const base = arcjet({
  // Get your site key from https://app.arcjet.com
  key: env.ARCJET_KEY,
  // Identify the user by their IP address
  characteristics: ['ip.src'],
  rules: [
    // Protect against common attacks with Arcjet Shield
    shield({
      // Will block requests. Use "DRY_RUN" to log only
      mode: 'LIVE',
    }),
    // Other rules are added in different routes
  ],
});

export const secure = async (
  allow: (ArcjetWellKnownBot | ArcjetBotCategory)[],
  sourceRequest?: Request
) => {
  const req = sourceRequest ?? (await request());
  const aj = base.withRule(detectBot({ mode: 'LIVE', allow }));
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    if (decision.reason.isBot()) {
      throw new Error('No bots allowed');
    }

    if (decision.reason.isRateLimit()) {
      throw new Error('Rate limit exceeded');
    }

    throw new Error('Access denied');
  }
};
