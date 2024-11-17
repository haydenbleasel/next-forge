import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Define service enable flags
const baseSchema = {
  ENABLE_CLERK: z.boolean().default(false),
  ENABLE_STRIPE: z.boolean().default(false),
  ENABLE_RESEND: z.boolean().default(false),
};

// Define service-specific schemas
const clerkSchema = {
  CLERK_SECRET_KEY: z.string().min(1).startsWith('sk_').optional(),
  CLERK_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),
};

const stripeSchema = {
  STRIPE_SECRET_KEY: z.string().min(1).startsWith('sk_').optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1).startsWith('whsec_').optional(),
};

const resendSchema = {
  RESEND_AUDIENCE_ID: z.string().min(1).optional(),
  RESEND_FROM: z.string().min(1).email().optional(),
  RESEND_TOKEN: z.string().min(1).startsWith('re_').optional(),
};

// Add other server variables
const serverBaseSchema = {
  DATABASE_URL: z.string().min(1).url(),
  BETTERSTACK_API_KEY: z.string().min(1),
  BETTERSTACK_URL: z.string().min(1).url(),
  ARCJET_KEY: z.string().min(1).startsWith('ajkey_'),
  ANALYZE: z.string().optional(),
  SVIX_TOKEN: z
    .string()
    .min(1)
    .startsWith('sk_')
    .or(z.string().min(1).startsWith('testsk_')),
  SENTRY_ORG: z.string().min(1).optional(),
  SENTRY_PROJECT: z.string().min(1).optional(),
  VERCEL: z.string().optional(),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
  FLAGS_SECRET: z.string().min(1),
};

// Dynamically build the server schema based on enabled services
const server = {
  ...baseSchema,
  ...serverBaseSchema,
  ...(process.env.ENABLE_CLERK === 'true' ? clerkSchema : {}),
  ...(process.env.ENABLE_STRIPE === 'true' ? stripeSchema : {}),
  ...(process.env.ENABLE_RESEND === 'true' ? resendSchema : {}),
};

// Define client schema
const client = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1).startsWith('pk_'),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1).startsWith('/'),
  NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
  NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
  NEXT_PUBLIC_DOCS_URL: z.string().min(1).url(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().min(1).startsWith('G-'),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).startsWith('phc_'),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1).url(),
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1).url(),
};

// Export the environment variables
export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    ENABLE_CLERK: process.env.ENABLE_CLERK === 'true',
    ENABLE_STRIPE: process.env.ENABLE_STRIPE === 'true',
    ENABLE_RESEND: process.env.ENABLE_RESEND === 'true',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    RESEND_FROM: process.env.RESEND_FROM,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_TOKEN: process.env.RESEND_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    BETTERSTACK_API_KEY: process.env.BETTERSTACK_API_KEY,
    BETTERSTACK_URL: process.env.BETTERSTACK_URL,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ANALYZE: process.env.ANALYZE,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    VERCEL: process.env.VERCEL,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    FLAGS_SECRET: process.env.FLAGS_SECRET,
    SVIX_TOKEN: process.env.SVIX_TOKEN,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
    NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
  },
});
