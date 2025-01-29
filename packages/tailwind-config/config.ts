import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import typographyConfig from './typography.config';

export const config: Config = {
  darkMode: ['class'],
  content: [
    './node_modules/@repo/design-system/components/**/*.{ts,tsx}',
    './node_modules/@repo/design-system/lib/**/*.{ts,tsx}',
    './node_modules/@repo/design-system/index.tsx',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './providers/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: typographyConfig,
    },
  },
  plugins: [animate, typography],
};
