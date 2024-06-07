'use server';

import { createServerClient } from '@repo/database/lib/server';
import { redirect } from 'next/navigation';

export const logout = async (): Promise<
  | {
      error: string;
    }
  | undefined
> => {
  const supabase = createServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  return redirect('/login');
};
