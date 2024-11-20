import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import defaultTheme from 'tailwindcss/defaultTheme';
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
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          foreground: 'hsl(var(--success-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          foreground: 'hsl(var(--warning-foreground) / <alpha-value>)',
        },
        brand: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
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
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        'shiny-text': {
          '0%, 90%, 100%': {
            'background-position': 'calc(-100% - var(--shiny-width)) 0',
          },
          '30%, 60%': {
            'background-position': 'calc(100% + var(--shiny-width)) 0',
          },
        },
        gradient: {
          to: {
            backgroundPosition: 'var(--bg-size) 0',
          },
        },
        rainbow: {
          '0%': { 'background-position': '0%' },
          '100%': { 'background-position': '200%' },
        },
        'shimmer-slide': {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)',
          },
        },
        'spin-around': {
          '0%': { transform: 'translateZ(0) rotate(0)' },
          '15%, 35%': { transform: 'translateZ(0) rotate(90deg)' },
          '65%, 85%': { transform: 'translateZ(0) rotate(270deg)' },
          '100%': { transform: 'translateZ(0) rotate(360deg)' },
        },
        grid: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        meteor: {
          '0%': {
            transform: 'rotate(215deg) translateX(0)',
            opacity: '1',
          },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
        'background-position-spin': {
          '0%': { backgroundPosition: 'top center' },
          '100%': { backgroundPosition: 'bottom center' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        shine: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        spotlight: {
          from: {
            opacity: '0',
            transform: 'translate(-72%,-62%) scale(.5)',
          },
          to: {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
        'galaxy-shimmer': {
          '0%': { opacity: '0.0' },
          '18%': { opacity: '0.2' },
          '50%': { opacity: '0.1' },
          '75%': { opacity: '0.35' },
          '100%': { opacity: '0.0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        'shiny-text': 'shiny-text 8s infinite',
        gradient: 'gradient 8s linear infinite',
        rainbow: 'rainbow var(--speed, 2s) infinite linear',
        'shimmer-slide':
          'shimmer-slide var(--speed) ease-in-out infinite alternate',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
        grid: 'grid 120s linear infinite',
        meteor: 'meteor 5s linear infinite',
        'background-position-spin':
          'background-position-spin 3000ms infinite alternate',
        marquee: 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        shine: 'shine 8s ease-in-out infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'galaxy-shimmer': 'galaxy-shimmer 20s ease-in-out infinite 3s',
      },
      spacing: {
        '2xs': '0.25rem',
        xs: '0.5rem',
        sm: '0.75rem',
        DEFAULT: '1rem',
        base: '1rem',
        md: '1.25rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        header: '3.5rem',
        section: '4rem',
      },
      transitionProperty: {
        width: 'width margin',
        height: 'height',
        bg: 'background-color',
        display: 'display opacity',
        visibility: 'visibility',
        padding: 'padding-top padding-right padding-bottom padding-left',
      },
      typography: typographyConfig,
    },
  },
  plugins: [animate, typography],
};
