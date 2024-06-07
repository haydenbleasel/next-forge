'use server';

import { createServerClient } from '@repo/database/lib/server';
import { redirect } from 'next/navigation';

export const verify = async (
  email: string,
  token: string
): Promise<
  | {
      error: string;
    }
  | undefined
> => {
  const supabase = createServerClient();

  const { error } = await supabase.auth.verifyOtp({
    type: 'email',
    email,
    token,
  });

  if (error) {
    return { error: error.message };
  }

  return redirect('/');
};
