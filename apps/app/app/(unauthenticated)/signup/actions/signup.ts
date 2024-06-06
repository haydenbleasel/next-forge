'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@repo/database/lib/server';
import { z } from 'zod';

const schema = z.string().email().min(1);

export const signup = async (
  formData: FormData
): Promise<{
  error?: string;
}> => {
  const supabase = createServerClient();
  const email = formData.get('email');

  const parse = schema.safeParse(email);

  if (parse.error) {
    return { error: parse.error.message };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: parse.data,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');

  return {};
};
