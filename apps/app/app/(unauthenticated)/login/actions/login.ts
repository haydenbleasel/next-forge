'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerClient } from '@repo/database/lib/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email().min(1),
});

export const login = async (
  formData: FormData
): Promise<{
  error?: string;
}> => {
  const supabase = createServerClient();

  const data = {
    email: formData.get('email'),
  };

  const parse = schema.safeParse(data);

  if (parse.error) {
    return { error: parse.error.message };
  }

  const { error } = await supabase.auth.signInWithOtp(parse.data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');

  return {};
};
