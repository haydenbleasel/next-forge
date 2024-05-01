'use server';

import { ContactTemplate } from '@repo/email/emails/contact';
import { parseError } from '@repo/design-system/lib/error';
import { resend } from '@repo/design-system/lib/resend';

const from = process.env.RESEND_FROM;

if (!from) {
  throw new Error('RESEND_FROM environment variable is not set');
}

export const contact = async (
  name: string,
  email: string,
  message: string
): Promise<{
  error?: string;
}> => {
  try {
    await resend.emails.send({
      from,
      to: from,
      subject: 'Contact form submission',
      reply_to: email,
      react: <ContactTemplate name={name} email={email} message={message} />,
    });

    return {};
  } catch (error) {
    const errorMessage = parseError(error);

    return { error: errorMessage };
  }
};
