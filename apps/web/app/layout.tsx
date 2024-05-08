import '@repo/design-system/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from '@repo/design-system/components/ui/sonner';
import { TooltipProvider } from '@repo/design-system/components/ui/tooltip';
import { DesignSystemProvider } from '@repo/design-system/provider';
import { cn } from '@repo/design-system/lib/utils';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';

type RootLayoutProps = {
  readonly children: ReactNode;
};

if (!process.env.VERCEL_PROJECT_PRODUCTION_URL) {
  throw new Error('VERCEL_PROJECT_PRODUCTION_URL is not defined.');
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL),
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <ClerkProvider>
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        'antialiased touch-manipulation font-sans'
      )}
    >
      <body className="bg-zinc-100 dark:bg-zinc-950">
        <DesignSystemProvider>
          <TooltipProvider>
            <Navbar />
            {children}
            <Footer />
          </TooltipProvider>
        </DesignSystemProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
