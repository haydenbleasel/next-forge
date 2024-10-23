'use client';

import { useMDXComponent } from '@content-collections/mdx/react';
import Image from 'next/image';
import type { FC, HTMLProps } from 'react';

type MdxProperties = {
  readonly code: string;
};

// eslint-disable-next-line id-length
const a: FC<HTMLProps<HTMLAnchorElement>> = ({ href, ...properties }) => {
  if (typeof href !== 'string') {
    throw new TypeError('href is required');
  }

  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...properties}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
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

export const Mdx: FC<MdxProperties> = ({ code }) => {
  const Component = useMDXComponent(code);

  return (
    <Component
      components={{
        // eslint-disable-next-line id-length
        a,
        img,
      }}
    />
  );
};
