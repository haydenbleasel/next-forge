import posthog, { type PostHog } from 'posthog-js';

const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!posthogApiKey || !posthogHost) {
  throw new Error(
    'NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_HOST is not set'
  );
}

export const analytics = posthog.init(posthogApiKey, {
  api_host: '/ingest',
  ui_host: 'https://us.posthog.com',
  person_profiles: 'identified_only',
  capture_pageview: false, // Disable automatic pageview capture, as we capture manually
}) as PostHog;
