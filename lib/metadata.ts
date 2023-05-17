import type { Metadata } from 'next';

type MetadataGenerator = (
  title: string,
  description: string,
  path?: string,
  image?: string
) => Metadata;

const applicationName = 'Forge';
const author: Metadata['authors'] = {
  name: 'Hayden Bleasel',
  url: 'https://haydenbleasel.com/',
};
const publisher = 'Beskar Labs';
const twitterHandle = '@haydenbleasel';

export const createMetadata: MetadataGenerator = (
  title,
  description,
  path,
  image
): Metadata => {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not defined');
  }

  const parsedTitle = `${title} | ${applicationName}`;
  const images = [];

  if (image) {
    images.push({
      url: image,
      width: 1200,
      height: 630,
      alt: title,
    });
  }

  const metadata: Metadata = {
    title: parsedTitle,
    description,
    applicationName,
    authors: [author],
    creator: author.name,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description,
      type: 'website',
      images,
      siteName: applicationName,
      locale: 'en_US',
      url: new URL(path ?? '/', process.env.NEXT_PUBLIC_SITE_URL).toString(),
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
    },
    viewport: {
      minimumScale: 1,
      initialScale: 1,
      width: 'device-width',
      viewportFit: 'cover',
    },
  };

  return metadata;
};
