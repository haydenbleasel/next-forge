import '@/styles/globals.css';
import clsx from 'clsx';
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
      {children}
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
