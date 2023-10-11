'use client';

import { useState } from 'react';
import { isValidEmail } from '@/lib/email';
import { useToast } from '@/components/ui/use-toast';
import { parseError } from '@/lib/error';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { contact } from '../actions/contact';
import type { FC, FormEventHandler } from 'react';

const emailRegex = /^\S+@\S+\.\S+$/u;

const ContactForm: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const disabled = loading || !name || !isValidEmail(email) || !message;
  const { toast } = useToast();

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const { error } = await contact(name, email, message);

      if (error) {
        throw new Error(error);
      }

      toast({ description: 'Message sent!' });

      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      const errorMessage = parseError(error);

      toast({ description: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col max-w-lg gap-8"
    >
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="Jane Smith"
          className="bg-white dark:bg-zinc-900"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          placeholder="jane@acme.com"
          className="bg-white dark:bg-zinc-900"
          pattern={emailRegex.source}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
          placeholder="Hi there, I'm interested in..."
          className="bg-white dark:bg-zinc-900"
        />
      </div>
      <Button disabled={disabled} type="submit" className="w-fit">
        Send message
      </Button>
    </form>
  );
};

export default ContactForm;
