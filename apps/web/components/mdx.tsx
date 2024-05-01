import Image from 'next/image';
import { getMDXComponent } from 'next-contentlayer/hooks';
import type { FC, HTMLProps } from 'react';

type MdxProps = {
  readonly code: string;
};

// eslint-disable-next-line id-length
const a: FC<HTMLProps<HTMLAnchorElement>> = ({ href, ...props }) => {
  if (typeof href !== 'string') {
    throw new Error('href is required');
  }

  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...props}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  );
};

const img: FC<HTMLProps<HTMLImageElement>> = (props) => {
  if (typeof props.src !== 'string' || typeof props.alt !== 'string') {
    throw new Error('Image src and alt are required');
  }

  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={1240}
      height={698}
      unoptimized={props.src.startsWith('http')}
      className="overflow-hidden rounded"
    />
  );
};

export const Mdx: FC<MdxProps> = ({ code }) => {
  const Component = getMDXComponent(code);

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
