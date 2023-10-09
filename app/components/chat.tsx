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
import type { FC } from 'react';

export const Chat: FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="fixed bottom-4 right-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon">
            <ChatBubbleIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'h-[50vh] w-[24rem] flex flex-col divide-y p-0 overflow-hidden',
            'bg-neutral-100 divide-neutral-200',
            'dark:bg-neutral-900 dark:divide-neutral-800'
          )}
          collisionPadding={16}
        >
          <div className="flex-1 p-4 overflow-y-auto text-sm flex flex-col gap-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'max-w-[75%] px-4 py-2 rounded shadow-sm',
                  message.role === 'user'
                    ? 'bg-white self-start text-neutral-900'
                    : 'bg-black self-end text-white'
                )}
              >
                {message.content}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="shrink-0 flex flex-col gap-1 bg-white"
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
        </PopoverContent>
      </Popover>
    </div>
  );
};
