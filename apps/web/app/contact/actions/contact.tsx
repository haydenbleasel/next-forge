'use server';

import { parseError } from '@repo/design-system/lib/error';
import { resend } from '@repo/design-system/lib/resend';
import { ContactTemplate } from '@repo/email-templates/contact';
import { env } from '@repo/env';

export const contact = async (
  name: string,
  email: string,
  message: string
): Promise<{
  error?: string;
}> => {
  try {
    await resend.emails.send({
      from: env.RESEND_FROM,
      to: env.RESEND_FROM,
      subject: 'Contact form submission',
      replyTo: email,
      react: <ContactTemplate name={name} email={email} message={message} />,
    });

    return {};
  } catch (error) {
    const errorMessage = parseError(error);

    return { error: errorMessage };
  }
};
