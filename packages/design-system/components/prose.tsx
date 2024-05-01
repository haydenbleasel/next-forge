import { cn } from '@/lib/utils';
import type { ComponentProps, FC } from 'react';

type ProseProps = ComponentProps<'div'>;

export const Prose: FC<ProseProps> = ({ className, ...props }) => (
  <div
    className={cn(
      'prose prose-gray prose-violet w-full',
      'dark:prose-invert',
      className
    )}
    {...props}
  />
);
