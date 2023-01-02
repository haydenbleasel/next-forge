import type { FC, ReactNode } from 'react';
import '@/styles/globals.css';
import clsx from 'clsx';
import { inter, ibmPlexMono } from '@/lib/fonts';

const Layout: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <html
    lang="en"
    className={clsx(inter.variable, ibmPlexMono.variable, 'font-sans')}
  >
    <body>{children}</body>
  </html>
);

export default Layout;
