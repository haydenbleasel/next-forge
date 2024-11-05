import '@repo/design-system/styles/globals.css';
import { cn } from '@repo/design-system/lib/utils';
import { DesignSystemProvider } from '@repo/design-system/providers';
import { ClerkProvider } from '@repo/design-system/providers/clerk';
import { Analytics } from '@vercel/analytics/react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html
    lang="en"
    className={cn(
      GeistSans.variable,
      GeistMono.variable,
      'touch-manipulation font-sans antialiased'
    )}
    suppressHydrationWarning
  >
    <body>
      <DesignSystemProvider>
        <ClerkProvider>{children}</ClerkProvider>
      </DesignSystemProvider>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
