import { unstable_flag as flag } from '@vercel/flags/next';

export const showSummerSale = flag({
  key: 'summer-sale',
  decide: () => false,
});
