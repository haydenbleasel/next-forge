'use client';

import { PostHogProvider as PostHogProviderRaw } from 'posthog-js/react';
import type { ReactNode } from 'react';
import { analytics } from '../lib/analytics/client';

export const PostHogProvider = ({ children }: { children: ReactNode }) => (
  <PostHogProviderRaw client={analytics}>{children}</PostHogProviderRaw>
);
