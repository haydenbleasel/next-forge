import './global.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter as createSans } from 'next/font/google';
import { JetBrains_Mono as createMono } from 'next/font/google';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { twMerge } from 'tailwind-merge';

const sans = createSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: 'variable',
});

const mono = createMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: 'variable',
});

type LayoutProps = {
  readonly children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <html
    lang="en"
    className={twMerge(
      'touch-manipulation font-sans antialiased',
      sans.variable,
      mono.variable
    )}
    suppressHydrationWarning
  >
    <body className="flex min-h-screen flex-col">
      {children}
      <Analytics />
      <Toaster />
    </body>
  </html>
);

export default Layout;
