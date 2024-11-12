'use client';

import { env } from '@repo/env';
import posthogRaw, { type PostHog } from 'posthog-js';
import { PostHogProvider as PostHogProviderRaw } from 'posthog-js/react';
import type { ReactNode } from 'react';

export const analytics = posthogRaw.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: '/ingest',
  ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
  person_profiles: 'identified_only',
  capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  capture_pageleave: true, // Overrides the `capture_pageview` setting
}) as PostHog;

type PostHogProviderProps = {
  readonly children: ReactNode;
};

export const PostHogProvider = (
  properties: Omit<PostHogProviderProps, 'client'>
) => <PostHogProviderRaw client={analytics} {...properties} />;
