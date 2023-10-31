import merge from 'lodash.merge';
import type { Metadata } from 'next';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const applicationName = 'next-forge';
const author: Metadata['authors'] = {
  name: 'Hayden Bleasel',
  url: 'https://haydenbleasel.com/',
};
const publisher = 'Hayden Bleasel';
const twitterHandle = '@haydenbleasel';

export const createMetadata = ({
  title,
  description,
  path,
  image,
  ...props
}: MetadataGenerator): Metadata => {
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not defined');
  }

  const parsedTitle = `${title} | ${applicationName}`;
  const defaultMetadata: Metadata = {
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
      siteName: applicationName,
      locale: 'en_US',
      url: new URL(path ?? '/', process.env.NEXT_PUBLIC_SITE_URL).toString(),
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
    },
  };

  const metadata: Metadata = merge(defaultMetadata, props);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ];
  }

  return metadata;
};
