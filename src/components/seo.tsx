import type { NextSeoProps } from 'next-seo';
import { NextSeo } from 'next-seo';
import type { MetaTag, OpenGraphMedia } from 'next-seo/lib/types';
import type { FC } from 'react';

type SeoProps = NextSeoProps & {
  path?: string;
  image?: string;
};

const name = '###SITE_NAME###';
const color = '###SITE_COLOR###';

const Seo: FC<SeoProps> = ({ path = '/', ...config }) => {
  const { title, description, image } = config;
  const url = path
    ? new URL(path, process.env.NEXT_PUBLIC_SITE_URL).href
    : process.env.NEXT_PUBLIC_SITE_URL;

  const imageUrl = new URL('/api/og', process.env.NEXT_PUBLIC_SITE_URL);
  imageUrl.searchParams.set('title', title ?? '');
  imageUrl.searchParams.set('description', description ?? '');
  imageUrl.searchParams.set('path', path);

  let images: OpenGraphMedia[] = [
    {
      url: imageUrl.href,
      width: 1200,
      height: 630,
      alt: name,
    },
  ];

  if (image) {
    images = [
      {
        url: new URL(image, process.env.NEXT_PUBLIC_SITE_URL).href,
      },
    ];
  }

  return (
    <NextSeo
      useAppDir
      titleTemplate={`%s — ${name}`}
      canonical={url}
      openGraph={{
        title,
        description,
        url,
        site_name: name,
        images,
      }}
      twitter={{
        cardType: 'summary_large_image',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color,
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
      ]}
      additionalMetaTags={[
        {
          charSet: 'utf-8',
        } as unknown as MetaTag,
        {
          name: 'viewport',
          content:
            'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
        },
        {
          name: 'application-name',
          content: name,
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'default',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: name,
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
        {
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'msapplication-TileColor',
          content: color,
        },
        {
          name: 'msapplication-tap-highlight',
          content: 'no',
        },
        {
          name: 'theme-color',
          content: color,
        },
      ]}
      {...config}
    />
  );
};

export default Seo;
