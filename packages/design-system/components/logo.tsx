import { cn } from '@repo/design-system/lib/utils';
import type { FC } from 'react';

type LogoProperties = {
  readonly showName?: boolean;
  readonly className?: string;
};

export const Logomark: FC<{ readonly className?: string }> = ({
  className,
}) => (
  <svg
    className={cn('w-6 h-6 dark:invert', className)}
    fill="none"
    height="300"
    viewBox="0 0 300 300"
    width="300"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Next Forge logo"
  >
    <path
      clipRule="evenodd"
      d="m150 0h-150l150 150h-150l150 150h150l-150-150h150z"
      fill="#000"
      fillRule="evenodd"
    />
  </svg>
);

export const Logo: FC<LogoProperties> = ({ showName, className }) => (
  <div className="flex items-center gap-2 not-prose">
    <Logomark className={className} />
    <p
      className={cn(
        'text-gray-900 dark:text-white font-medium',
        !showName && 'sr-only'
      )}
    >
      next-forge
    </p>
  </div>
);
