import { MDXContent } from '@content-collections/mdx/react';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps, HTMLProps } from 'react';

const a = ({ href, ...properties }: HTMLProps<HTMLAnchorElement>) => {
  if (typeof href !== 'string') {
    throw new TypeError('href is required');
  }

  if (href.startsWith('/')) {
    return <Link href={href} {...properties} />;
  }

  return (
    <a {...properties} href={href} target="_blank" rel="noopener noreferrer" />
  );
};

const img = (properties: HTMLProps<HTMLImageElement>) => {
  if (
    typeof properties.src !== 'string' ||
    typeof properties.alt !== 'string'
  ) {
    throw new TypeError('Image src and alt are required');
  }

  return (
    <Image
      src={properties.src}
      alt={properties.alt}
      width={1240}
      height={698}
      unoptimized={properties.src.startsWith('http')}
      className="overflow-hidden rounded"
    />
  );
};

const CompanyName = () => 'next-forge';

export const Mdx = ({
  code,
  components,
}: ComponentProps<typeof MDXContent>) => (
  <div className="prose prose-neutral dark:prose-invert">
    <MDXContent
      code={code}
      components={{
        a,
        img,
        CompanyName,
        ...components,
      }}
    />
  </div>
);
