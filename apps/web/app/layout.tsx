import '@repo/design-system/styles/globals.css';
import { fonts } from '@repo/design-system/lib/fonts';
import { DesignSystemProvider } from '@repo/design-system/providers';
import { Analytics } from '@vercel/analytics/react';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>
        <Header />
        {children}
        <Footer />
      </DesignSystemProvider>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
