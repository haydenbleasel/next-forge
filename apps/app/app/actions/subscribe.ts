'use server';

import { parseError } from '@/lib/error';
import { resend } from '@/lib/resend';

const audienceId = process.env.RESEND_AUDIENCE_ID;

if (!audienceId) {
  throw new Error('Missing RESEND_AUDIENCE_ID');
}

export const subscribe = async (
  email: string
): Promise<{
  error?: string;
}> => {
  try {
    const response = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {};
  } catch (error) {
    const message = parseError(error);

    return {
      error: message,
    };
  }
};
