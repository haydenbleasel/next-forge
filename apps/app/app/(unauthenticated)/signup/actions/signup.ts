'use server';

import { createServerClient } from '@repo/database/lib/server';
import { z } from 'zod';

const schema = z.string().email().min(1);

export const signup = async (
  formData: FormData,
  emailRedirectTo: string
): Promise<
  | {
      error: string;
    }
  | {
      message: string;
    }
> => {
  const supabase = createServerClient();
  const email = formData.get('email');
  const parse = schema.safeParse(email);

  if (parse.error) {
    // eslint-disable-next-line no-underscore-dangle
    return { error: parse.error.format()._errors.join(' ') };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: parse.data,
    options: {
      shouldCreateUser: true,
      emailRedirectTo,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { message: 'Check your email for a sign up link!' };
};
