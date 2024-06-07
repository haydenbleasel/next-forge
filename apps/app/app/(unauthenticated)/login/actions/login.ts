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

  const { error } = await supabase.auth.signInWithOtp({
    email: parse.data,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return undefined;
};
