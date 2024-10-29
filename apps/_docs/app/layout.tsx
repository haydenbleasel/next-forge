import './global.css';
import { Analytics } from '@vercel/analytics/react';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
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
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
