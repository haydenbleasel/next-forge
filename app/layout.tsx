import '@/styles/globals.css';
import { twMerge } from 'tailwind-merge';
import { TooltipProvider } from '@beskar-labs/gravity/tooltip';
import { Toaster } from '@beskar-labs/gravity/toast';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import { sans, mono } from '@/lib/fonts';
import type { FC, ReactNode } from 'react';

type RootLayoutProps = {
  readonly children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <ClerkProvider>
    <html
      lang="en"
      className={twMerge(
        sans.variable,
        mono.variable,
        'antialiased touch-manipulation font-sans'
      )}
      style={{
        textRendering: 'optimizeLegibility',
      }}
    >
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
