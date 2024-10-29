import { auth } from '@clerk/nextjs/server';
import { analytics } from '@repo/design-system/lib/analytics/server';
import { type FlagOverridesType, decrypt } from '@vercel/flags';
import { unstable_flag as flag } from '@vercel/flags/next';

export const createFlag = (key: string) => {
  return flag({
    key,
    async decide(params) {
      const overrideCookie = params.cookies.get('vercel-flag-overrides')?.value;
      const overrides = overrideCookie
        ? await decrypt<FlagOverridesType>(overrideCookie)
        : {};

      if (overrides && key in overrides) {
        return overrides[key];
      }

      try {
        const { userId } = await auth();

        if (!userId) {
          return false;
        }

        const isEnabled = await analytics.isFeatureEnabled(key, userId);

        return isEnabled ?? false;
      } catch (_error) {
        return false;
      }
    },
  });
};
