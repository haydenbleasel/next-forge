import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type DocsButtonProps = {
  className?: string;
};

export const DocsButton = ({ className }: DocsButtonProps) => (
  <Link
    href="/docs"
    className={twMerge(
      'inline-flex shrink-0 items-center justify-center rounded-md bg-orange-500 px-4 py-2.5 font-semibold text-sm text-white shadow-sm hover:bg-orange-600',
      className
    )}
  >
    Read the docs
  </Link>
);
