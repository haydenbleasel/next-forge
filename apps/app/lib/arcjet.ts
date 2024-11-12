import arcjet, { shield } from '@arcjet/next';
import { env } from '@repo/env';

// Re-export the rules to simplify imports inside handlers
export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from '@arcjet/next';

// Create a base Arcjet instance which can be imported and extended in each route.
export default arcjet({
  // Get your site key from https://app.arcjet.com
  key: env.ARCJET_KEY,
  // Identify the user by their IP address
  characteristics: ['ip.src'],
  rules: [
    // Protect against common attacks with Arcjet Shield
    shield({
      mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
    }),
    // Other rules are added in different routes
  ],
});
