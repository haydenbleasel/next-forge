import { Drawer as Vaul } from 'vaul';
import { cn } from '@/lib/utils';
import type { ComponentProps, FC } from 'react';

const Root: FC<ComponentProps<typeof Vaul.Root>> = (props) => (
  <Vaul.Root {...props} />
);

const Trigger: FC<ComponentProps<typeof Vaul.Trigger>> = (props) => (
  <Vaul.Trigger {...props} />
);

const Portal: FC<ComponentProps<typeof Vaul.Portal>> = (props) => (
  <Vaul.Portal {...props} />
);

const Content: FC<ComponentProps<typeof Vaul.Content>> = ({
  className,
  ...props
}) => (
  <Vaul.Content
    className={cn(
      'z-10 bg-white pt-8 p-4 flex flex-col rounded-t-[10px] h-[85%] mt-24 fixed bottom-0 left-0 right-0',
      className
    )}
    {...props}
  />
);

const Overlay: FC<ComponentProps<typeof Vaul.Overlay>> = ({
  className,
  ...props
}) => (
  <Vaul.Overlay
    className={cn('fixed inset-0 bg-black/40', className)}
    {...props}
  />
);

const Title: FC<ComponentProps<typeof Vaul.Title>> = (props) => (
  <Vaul.Title className={cn('font-medium mb-4')} {...props} />
);

const Description: FC<ComponentProps<typeof Vaul.Description>> = (props) => (
  <Vaul.Description className={cn('text-sm text-zinc-500')} {...props} />
);

const Close: FC<ComponentProps<typeof Vaul.Close>> = (props) => (
  <Vaul.Close className={cn('absolute top-4 right-4')} {...props} />
);

const Handle: FC<{ readonly className?: string }> = ({ className }) => (
  <div
    className={cn(
      'absolute top-4 left-0 right-0 mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300',
      className
    )}
  />
);

export const Drawer = {
  Root,
  Trigger,
  Portal,
  Content,
  Overlay,
  Title,
  Description,
  Close,
  Handle,
};
