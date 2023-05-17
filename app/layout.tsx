import '@/styles/globals.css';
import clsx from 'clsx';
import { TooltipProvider } from '@beskar-labs/gravity/tooltip';
import { Toaster } from '@beskar-labs/gravity/toast';
import { Analytics } from '@vercel/analytics/react';
import { inter, ibmPlexMono } from '@/lib/fonts';
import type { FC, ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html
    lang="en"
    className={clsx(inter.variable, ibmPlexMono.variable, 'font-sans')}
  >
    <body>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
