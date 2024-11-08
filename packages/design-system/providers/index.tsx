import { GoogleAnalytics } from '@repo/analytics/google';
import { PostHogProvider } from '@repo/analytics/posthog/client';
import { VercelAnalytics } from '@repo/analytics/vercel';
import { AuthProvider } from '@repo/auth/provider';
import { env } from '@repo/env';
import { VercelToolbar } from '@vercel/toolbar/next';
import type { ThemeProviderProps } from 'next-themes';
import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';
import { ThemeProvider } from './theme';

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <AuthProvider>
      <PostHogProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <VercelAnalytics />
        {env.NODE_ENV === 'development' ? (
          <VercelToolbar />
        ) : (
          <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </PostHogProvider>
    </AuthProvider>
  </ThemeProvider>
);
