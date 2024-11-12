import './global.css';
import { Analytics } from '@vercel/analytics/react';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

type LayoutProps = {
  readonly children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <html
    lang="en"
    className="touch-manipulation font-sans antialiased"
    suppressHydrationWarning
  >
    <head>
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
      />
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/css?f%5B%5D=jet-brains-mono@400&amp;display=swap"
      />
    </head>
    <body className="flex min-h-screen flex-col">
      {children}
      <Analytics />
      <Toaster />
    </body>
  </html>
);

export default Layout;
