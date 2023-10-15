import Script from 'next/script';
import type { FC } from 'react';

export const GoogleAnalytics: FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    throw new Error('NEXT_PUBLIC_GA_MEASUREMENT_ID is not set');
  }

  return (
    <Script id="google-analytics">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
    </Script>
  );
};
