'use client';

import { useChat } from 'ai/react';
import { ChatBubbleIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Drawer } from '@/components/drawer';
import type { FC } from 'react';

const ChatInner: FC<{ readonly className?: string }> = ({ className }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div
      className={cn(
        'flex flex-1 flex-col divide-y h-full',
        'bg-zinc-100 divide-zinc-200',
        'dark:bg-zinc-950 dark:divide-zinc-800'
      )}
    >
      <div
        className={cn(
          'flex-1 p-4 overflow-y-auto text-sm flex flex-col gap-2',
          className
        )}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'max-w-[75%] px-4 py-2 rounded shadow-sm',
              message.role === 'user'
                ? 'bg-white self-start text-zinc-900'
                : 'bg-black self-end text-white'
            )}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="shrink-0 flex flex-col gap-1 bg-white dark:bg-black"
      >
        <Input
          value={input}
          placeholder="Ask me something about next-forge"
          onChange={handleInputChange}
          className="rounded-none border-none shadow-none py-6 pb-16"
        />
        <div className="absolute bottom-0 right-0 p-4">
          <Button type="submit" variant="outline" size="icon">
            <PaperPlaneIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export const Chat: FC = () => (
  <>
    <div className="block sm:hidden">
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <div className="fixed bottom-4 right-4">
            <Button size="icon">
              <ChatBubbleIcon />
            </Button>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content className="p-0">
            <Drawer.Handle />
            <ChatInner className="pt-12" />
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    </div>
    <div className="hidden sm:block fixed bottom-4 right-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon">
            <ChatBubbleIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="h-[50vh] w-[24rem] p-0 overflow-hidden"
          collisionPadding={16}
          sideOffset={16}
        >
          <ChatInner />
        </PopoverContent>
      </Popover>
    </div>
  </>
);
