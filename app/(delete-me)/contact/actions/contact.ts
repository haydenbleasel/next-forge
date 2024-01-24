'use server';

import { render } from '@react-email/render';
import { ContactTemplate as template } from '@/emails/contact';
import { parseError } from '@/lib/error';
import { resend } from '@/lib/resend';
import type { ReactElement } from 'react';

export const contact = async (
  name: string,
  email: string,
  message: string
): Promise<{
  error?: string;
}> => {
  const react = template({
    name,
    email,
    message,
  }) as ReactElement;
  const text = render(react, { plainText: true });

  if (!process.env.RESEND_FROM) {
    throw new Error('RESEND_FROM environment variable is not set');
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_FROM,
      subject: 'Contact form submission',
      reply_to: email,
      react,
      text,
    });

    return {};
  } catch (error) {
    const errorMessage = parseError(error);

    return { error: errorMessage };
  }
};
