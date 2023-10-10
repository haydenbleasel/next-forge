import { cn } from '@/lib/utils';
import type { ComponentProps, FC } from 'react';

type ContainerProps = ComponentProps<'div'>;

export const Container: FC<ContainerProps> = ({ className, ...props }) => (
  <div className={cn('container mx-auto px-4', className)} {...props} />
);
