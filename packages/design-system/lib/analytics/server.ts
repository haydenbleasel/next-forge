import { PostHog } from 'posthog-node';

const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!posthogApiKey || !posthogHost) {
  throw new Error(
    'NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_HOST is not set'
  );
}

export const analytics = new PostHog(posthogApiKey, {
  host: posthogHost,
});
