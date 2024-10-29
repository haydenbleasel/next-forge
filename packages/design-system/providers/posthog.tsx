'use client';

import { PostHogProvider as PostHogProviderRaw } from 'posthog-js/react';
import type { ReactNode } from 'react';
import { analytics } from '../lib/analytics/client';

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!posthogKey || !posthogHost) {
  throw new Error(
    'NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST must be set'
  );
}

if (typeof window !== 'undefined') {
  analytics.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
  });
}

export const PostHogProvider = ({ children }: { children: ReactNode }) => (
  <PostHogProviderRaw client={analytics}>{children}</PostHogProviderRaw>
);
