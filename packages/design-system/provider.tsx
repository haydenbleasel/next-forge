import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import type { FC } from 'react';
import type { ThemeProviderProps } from 'next-themes/dist/types';

type AnalyticsProperties = {
  readonly gaMeasurementId?: string;
};

type DesignSystemProviderProperties = AnalyticsProperties & ThemeProviderProps;

const GoogleAnalytics: FC<AnalyticsProperties> = ({ gaMeasurementId }) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }

  if (!gaMeasurementId) {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }

  return (
    <Script id="google-analytics">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${gaMeasurementId}');
        `}
    </Script>
  );
};

export const DesignSystemProvider: FC<DesignSystemProviderProperties> = ({
  children,
  gaMeasurementId,
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
    <GoogleAnalytics gaMeasurementId={gaMeasurementId} />
  </>
);
