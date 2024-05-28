/* eslint-disable sonarjs/no-duplicate-string */

import animate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    'node_modules/@repo/design-system/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
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
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            ':first-child': {
              marginTop: theme('margin.0'),
            },
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: theme('fontWeight.semibold'),
              letterSpacing: theme('letterSpacing.tight'),
              marginBottom: theme('margin.4'),

              '+ h1, + h2, + h3, + h4, + h5, + h6': {
                marginTop: theme('margin.0'),
              },
            },
            h1: {
              fontSize: theme('fontSize.3xl'),
              marginTop: theme('margin.16'),
            },
            h2: {
              fontSize: theme('fontSize.2xl'),
            },
            h3: {
              fontSize: theme('fontSize.xl'),
            },
            h4: {
              fontSize: theme('fontSize.lg'),
            },
            h5: {
              fontSize: theme('fontSize.base'),
            },
            h6: {
              fontSize: theme('fontSize.base'),
            },
            table: {
              boxShadow: `0 0 0 1px ${theme('colors.gray.200')}`,
              borderRadius: theme('borderRadius.md'),
              overflow: 'hidden',
              // eslint-disable-next-line id-length
              p: {
                margin: 0,
              },
              th: {
                paddingTop: '0.5714286em',
                paddingRight: '0.5714286em',
                paddingBottom: '0.5714286em',
                paddingLeft: '0.5714286em',
                backgroundColor: theme('colors.gray.100'),
                '&:not(:last-child)': {
                  borderRightWidth: '1px',
                  borderRightColor: theme('colors.gray.200'),
                },
              },
              'tbody td, tfoot td': {
                paddingLeft: '0.5714286em',
                '&:not(:last-child)': {
                  borderRightWidth: '1px',
                  borderRightColor: theme('colors.gray.200'),
                },
              },
            },
            code: {
              '&::before, &::after': {
                display: 'none',
              },
            },
            pre: {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: theme('colors.gray.200'),
            },
          },
        },
        invert: {
          css: {
            table: {
              boxShadow: `0 0 0 1px ${theme('colors.gray.700')}`,
              th: {
                backgroundColor: theme('colors.gray.800'),
                '&:not(:last-child)': {
                  borderRightColor: theme('colors.gray.700'),
                },
              },
              'tbody td, tfoot td': {
                '&:not(:last-child)': {
                  borderRightColor: theme('colors.gray.700'),
                },
              },
            },
            pre: {
              borderColor: theme('colors.gray.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [animate, typography],
};

export default config;
