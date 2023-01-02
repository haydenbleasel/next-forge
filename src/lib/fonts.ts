import {
  IBM_Plex_Mono as createIBMPlexMono,
  Inter as createInter,
} from '@next/font/google';

export const inter = createInter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const ibmPlexMono = createIBMPlexMono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
});
