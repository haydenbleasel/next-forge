import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { FC } from 'react';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import Script from 'next/script';

type AnalyticsProps = {
  readonly gaMeasurementId?: string;
};

type DesignSystemProviderProps = ThemeProviderProps & AnalyticsProps;

const GoogleAnalytics: FC<AnalyticsProps> = ({ gaMeasurementId }) => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  if (!gaMeasurementId) {
    return null;
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

export const DesignSystemProvider: FC<DesignSystemProviderProps> = ({
  children,
  gaMeasurementId,
  ...props
}) => (
  <>
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
    <Toaster />
    <VercelAnalytics />
    <GoogleAnalytics gaMeasurementId={gaMeasurementId} />
  </>
);
