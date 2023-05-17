import type { FC, ReactNode } from 'react';
import '@/styles/globals.css';
import clsx from 'clsx';
import { Analytics } from '@vercel/analytics/react';
import { inter, ibmPlexMono } from '@/lib/fonts';

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => (
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

export default Layout;
