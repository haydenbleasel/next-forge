import NextLink from 'next/link';
import { forwardRef } from 'react';
import type { ComponentProps } from 'react';

type LinkProps = {
  readonly href: string;
  readonly children: ComponentProps<'a'>['children'];
  readonly className?: string;
  readonly external?: boolean;
};

// eslint-disable-next-line react/display-name
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, external, ...props }, ref) => {
    const isExternal = href.startsWith('http');

    if (isExternal) {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
          ref={ref}
        />
      );
    }

    return (
      <NextLink
        target={external ? '_blank' : undefined}
        href={href}
        {...props}
        ref={ref}
      />
    );
  }
);
