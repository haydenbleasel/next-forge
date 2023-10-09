import { Knock } from '@knocklabs/node';
import { BellIcon } from '@radix-ui/react-icons';
import { currentUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ReactElement } from 'react';

if (!process.env.KNOCK_API_KEY) {
  throw new Error('Missing KNOCK_API_KEY environment variable');
}

const knockClient = new Knock(process.env.KNOCK_API_KEY);

export const Notifications = async (): Promise<ReactElement> => {
  const user = await currentUser();

  if (!user?.id) {
    return (
      <Button variant="outline" size="icon" disabled>
        <BellIcon />
      </Button>
    );
  }

  const messages = await knockClient.users.getMessages(user.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <BellIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {messages.items.map((message) => (
          <DropdownMenuItem key={message.id}>{message.data}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
