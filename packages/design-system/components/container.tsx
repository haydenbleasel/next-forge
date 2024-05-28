import { cn } from '~/lib/utils';
import type { ComponentProps, FC } from 'react';

type ContainerProperties = ComponentProps<'div'>;

export const Container: FC<ContainerProperties> = ({
  className,
  ...properties
}) => (
  <div
    className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
    {...properties}
  />
);
