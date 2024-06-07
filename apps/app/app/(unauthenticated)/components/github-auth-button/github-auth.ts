'use server';

import { createServerClient } from '@repo/database/lib/server';
import { redirect } from 'next/navigation';

export const gitHubAuth = async (
  redirectTo: string
): Promise<
  | {
      error: string;
    }
  | undefined
> => {
  const supabase = createServerClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.url) {
    return { error: 'No URL returned from GitHub' };
  }

  return redirect(data.url);
};
