'use client';

import { useChat } from 'ai/react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { cn } from '@repo/design-system/lib/utils';
import { Container } from '@repo/design-system/components/container';
import type { FC } from 'react';

export const Chat: FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <Container>
      <div className="flex flex-1 flex-col h-full">
        <div className="flex-1 overflow-y-auto text-sm flex flex-col gap-2">
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
          className="mt-8 shrink-0 flex flex-col gap-1 relative"
        >
          <Input
            value={input}
            placeholder="Ask me something about next-forge"
            onChange={handleInputChange}
            className="py-6 pb-16 bg-white"
          />
          <div className="absolute bottom-0 right-0 p-4">
            <Button type="submit" variant="outline" size="icon">
              <PaperPlaneIcon />
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};
