import { currentUser } from '@clerk/nextjs/server';
import { analytics } from '@repo/design-system/lib/analytics/server';
import { unstable_flag as flag } from '@vercel/flags/next';

export const showBetaFeature = flag({
  key: 'beta-feature',
  async decide() {
    const user = await currentUser();

    if (!user) {
      return false;
    }

    const isEnabled = await analytics.isFeatureEnabled(this.key, user.id);

    return isEnabled ?? false;
  },
});
