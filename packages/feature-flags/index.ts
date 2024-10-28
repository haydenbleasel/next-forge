import { auth } from '@clerk/nextjs/server';
import { analytics } from '@repo/design-system/lib/analytics/server';
import { unstable_flag as flag } from '@vercel/flags/next';

export const showBetaFeature = flag({
  key: 'beta-feature',
  async decide() {
    try {
      const { userId } = await auth();

      if (!userId) {
        return false;
      }

      const isEnabled = await analytics.isFeatureEnabled(this.key, userId);

      return isEnabled ?? false;
    } catch (_error) {
      return false;
    }
  },
});
