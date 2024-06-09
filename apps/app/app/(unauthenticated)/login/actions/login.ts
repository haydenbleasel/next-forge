'use server';

import { createServerClient } from '@repo/database/lib/server';
import { z } from 'zod';

const schema = z.string().email().min(1);

export const login = async (
  email: string
): Promise<
  | {
      error: string;
    }
  | undefined
> => {
  const supabase = createServerClient();
  const parse = schema.safeParse(email);

  if (parse.error) {
    // eslint-disable-next-line no-underscore-dangle
    return { error: parse.error.format()._errors.join(' ') };
  }

  // TODO: Check if the user already exists, throw an error if not

  const { error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: parse.data,
  });

  if (error) {
    if (error.code === 'otp_disabled') {
      return {
        error: "You don't have an account yet. Please create an account.",
      };
    }

    return { error: error.message };
  }

  return undefined;
};
