import { cn } from '@repo/design-system/lib/utils';
import { Geist, Geist_Mono } from 'next/font/google';

const sans = Geist({ subsets: ['latin'], variable: '--font-sans' });
const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fonts = cn(
  sans.variable,
  mono.variable,
  'touch-manipulation font-sans antialiased'
);
