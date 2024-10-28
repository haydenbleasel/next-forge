import '@repo/design-system/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@repo/design-system/components/ui/sonner';
import { TooltipProvider } from '@repo/design-system/components/ui/tooltip';
import { cn } from '@repo/design-system/lib/utils';
import { DesignSystemProvider } from '@repo/design-system/providers';
import { Analytics } from '@vercel/analytics/react';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <ClerkProvider>
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
          <TooltipProvider>{children}</TooltipProvider>
        </DesignSystemProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
