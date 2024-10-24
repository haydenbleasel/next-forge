import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import type { FC } from 'react';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';

const gaMeasurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

type DesignSystemProviderProperties = ThemeProviderProps;

export const DesignSystemProvider: FC<DesignSystemProviderProperties> = ({
  children,
  ...properties
}) => (
  <>
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...properties}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
    <Toaster />
    <VercelAnalytics />
    {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
  </>
);
