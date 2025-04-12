import './styles.css';
import { Toolbar as CMSToolbar } from '@repo/cms/components/toolbar';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import { getDictionary } from '@repo/internationalization';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://radomisli.com'),
  title: {
    default: 'Radomisli | Holistische Massage & Ademwerk',
    template: '%s | Radomisli'
  },
  description: 'Ervaar professionele massage, ademwerk en energetische begeleiding bij Radomisli. Praktisch, intuïtief en effectief.',
  openGraph: {
    title: 'Radomisli | Holistische Massage & Ademwerk',
    description: 'Professionele massagepraktijk en ademtherapie, begeleid door Yuri Radomisli.',
    url: 'https://radomisli.com',
    siteName: 'Radomisli',
    locale: 'nl_NL',
    type: 'website',
    images: [
      {
        url: 'https://placehold.co/1200x630',
        width: 1200,
        height: 630,
        alt: 'Radomisli - Holistische Massage & Ademwerk'
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  }
}

type RootLayoutProperties = {
  readonly children: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
};

const RootLayout = async ({ children, params }: RootLayoutProperties) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={cn(fonts, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <DesignSystemProvider>
          <Header dictionary={dictionary} />
          {children}
          <Footer />
        </DesignSystemProvider>
        <Toolbar />
        <CMSToolbar />
      </body>
    </html>
  );
};

export default RootLayout;
