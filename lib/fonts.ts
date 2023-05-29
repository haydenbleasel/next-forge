import {
  IBM_Plex_Mono as createMono,
  Inter as createSans,
} from 'next/font/google';

export const sans = createSans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const mono = createMono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
});
