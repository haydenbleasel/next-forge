import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import typographyConfig from './typography.config';

export const config: Config = {
  theme: {
    extend: {
      typography: typographyConfig,
    },
  },
  plugins: [animate, typography],
};
