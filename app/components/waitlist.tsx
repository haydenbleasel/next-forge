'use client';

import { useState } from 'react';
import { isValidEmail } from '@/lib/email';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { parseError } from '@/lib/error';
import { useToast } from '@/components/ui/use-toast';
import type { FC, FormEventHandler } from 'react';

const domain = 'app.loops.so';
const userGroup = 'Waitlist';
const formId = 'clmnqcb4e024xma0or3stgrkd';

export const Waitlist: FC = () => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const time = new Date();
    const timestamp = time.valueOf();
    const previousTimestamp = localStorage.getItem('loops-form-timestamp');

    try {
      if (
        previousTimestamp &&
        Number(previousTimestamp) + 60 * 1000 > timestamp
      ) {
        throw new Error('Too many signups, please try again in a little while');
      }

      localStorage.setItem('loops-form-timestamp', timestamp.toString());

      if (!isValidEmail(email)) {
        throw new Error('Please enter a valid email');
      }

      const formBody = new URLSearchParams({
        userGroup,
        email,
      });

      const response = await fetch(
        `https://${domain}/api/newsletter-form/${formId}`,
        {
          method: 'POST',
          body: formBody.toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const data = (await response.json()) as {
        message?: string;
      };

      if (response.status === 429) {
        throw new Error('Too many signups, please try again in a little while');
      }

      if (!response.ok) {
        throw new Error(data.message ?? response.statusText);
      }

      setEmail('');
      toast({ description: "Thanks! We'll be in touch!" });
    } catch (error) {
      const message = parseError(error);

      toast({
        description: message,
        variant: 'destructive',
      });
    } finally {
      localStorage.setItem('loops-form-timestamp', '');
      setDisabled(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex items-center gap-2 max-w-lg w-full"
    >
      <Input
        type="text"
        name="email"
        placeholder="you@example.com"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        required
        className="bg-white"
      />
      <Button type="submit" className="shrink-0" disabled={disabled}>
        {disabled ? 'Please wait...' : 'Join the mailing list'}
      </Button>
    </form>
  );
};
