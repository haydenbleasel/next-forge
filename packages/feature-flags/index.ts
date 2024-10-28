import { unstable_flag as flag } from '@vercel/flags/next';

export const showBetaFeature = flag({
  key: 'beta-feature',
  decide: () => false,
});
