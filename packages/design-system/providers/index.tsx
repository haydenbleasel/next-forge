import { GoogleAnalytics } from '@next/third-parties/google';
import { env } from '@repo/env';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { VercelToolbar } from '@vercel/toolbar/next';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';
import { PostHogProvider } from './posthog';
import { ThemeProvider } from './theme';

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <PostHogProvider>
    <ThemeProvider {...properties}>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </ThemeProvider>
    <VercelAnalytics />
    {env.NODE_ENV === 'development' ? (
      <VercelToolbar />
    ) : (
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    )}
  </PostHogProvider>
);
