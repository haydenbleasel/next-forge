import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans, GeistMono } from 'geist/font';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/providers/theme-provider';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@/components/google-analytics';
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
        GeistSans.variable,
        GeistMono.variable,
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
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
