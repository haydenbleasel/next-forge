'use server';

import { redirect } from 'next/navigation';
import { createServerClient } from '@repo/database/lib/server';
import { z } from 'zod';

const schema = z.string().email().min(1);

export const signup = async (
  formData: FormData
): Promise<
  | {
      error: string;
    }
  | undefined
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
    },
  });

  if (error) {
    return { error: error.message };
  }

  return redirect('/verify');
};
