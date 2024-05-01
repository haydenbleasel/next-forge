import { cn } from '~/lib/utils';
import type { ComponentProps, FC } from 'react';

type ContainerProps = ComponentProps<'div'>;

export const Container: FC<ContainerProps> = ({ className, ...props }) => (
  <div
    className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
    {...props}
  />
);
