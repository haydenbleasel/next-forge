import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import { sans, mono } from '@/lib/fonts';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import type { FC, ReactNode } from 'react';

type RootLayoutProps = {
  readonly children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <ClerkProvider>
    <html
      lang="en"
      className={cn(
        sans.variable,
        mono.variable,
        'antialiased touch-manipulation font-sans'
      )}
    >
      <body className="bg-zinc-100 dark:bg-zinc-950">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Navbar />
            <div className="min-h-[calc(100dvh-61px)]">{children}</div>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
