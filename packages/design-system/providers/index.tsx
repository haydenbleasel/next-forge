import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { VercelToolbar } from '@vercel/toolbar/next';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';
import { PostHogProvider } from './posthog';
import { ThemeProvider } from './theme';

const gaMeasurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <PostHogProvider>
    <ThemeProvider {...properties}>
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
    <Toaster />
    <VercelAnalytics />
    {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
    {process.env.NODE_ENV === 'development' && <VercelToolbar />}
  </PostHogProvider>
);
