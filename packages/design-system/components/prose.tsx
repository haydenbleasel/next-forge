import { cn } from '@repo/design-system/lib/utils';
import type { ComponentProps, FC } from 'react';

type ProseProperties = ComponentProps<'div'>;

export const Prose: FC<ProseProperties> = ({ className, ...properties }) => (
  <div
    className={cn(
      'prose prose-gray prose-violet w-full',
      'dark:prose-invert',
      className
    )}
    {...properties}
  />
);
