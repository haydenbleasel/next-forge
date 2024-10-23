import { MDXContent } from '@content-collections/mdx/react';
import Image from 'next/image';
import Link from 'next/link';
import type { FC, HTMLProps } from 'react';

type MdxProperties = {
  readonly code: string;
};

// eslint-disable-next-line id-length
const a: FC<HTMLProps<HTMLAnchorElement>> = ({ href, ...properties }) => {
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

const img: FC<HTMLProps<HTMLImageElement>> = (properties) => {
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

const CompanyName: FC = () => 'next-forge';

export const Mdx: FC<MdxProperties> = ({ code }) => (
  <div className="prose prose-neutral dark:prose-invert">
    <MDXContent
      code={code}
      components={{
        a,
        img,
        CompanyName,
      }}
    />
  </div>
);
