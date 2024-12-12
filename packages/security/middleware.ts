import {
  type NoseconeOptions,
  defaults,
  withVercelToolbar,
} from '@nosecone/next';
import { env } from '@repo/env';
export { createMiddleware as noseconeMiddleware } from '@nosecone/next';

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
const noseconeOptions: NoseconeOptions = {
  ...defaults,
  // Content Security Policy (CSP) is disabled by default because the values
  // depend on which Next Forge features are enabled. See
  // https://docs.next-forge.com/features/security/headers for guidance on how
  // to configure it.
  contentSecurityPolicy: false,
};

export const noseconeConfig: NoseconeOptions =
  env.NODE_ENV === 'development' && env.FLAGS_SECRET
    ? withVercelToolbar(noseconeOptions)
    : noseconeOptions;
