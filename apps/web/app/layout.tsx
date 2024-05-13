import '@repo/design-system/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from '@repo/design-system/components/ui/sonner';
import { TooltipProvider } from '@repo/design-system/components/ui/tooltip';
import { DesignSystemProvider } from '@repo/design-system/provider';
import { cn } from '@repo/design-system/lib/utils';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import type { FC, ReactNode } from 'react';

type RootLayoutProps = {
  readonly children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html
    lang="en"
    className={cn(
      GeistSans.variable,
      GeistMono.variable,
      'antialiased touch-manipulation font-sans'
    )}
  >
    <body className="bg-white dark:bg-zinc-950">
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
);

export default RootLayout;
