'use server';

import { createServerClient } from '@repo/database/lib/server';

export const gitHubAuth = async (): Promise<{
  error?: string;
}> => {
  const supabase = createServerClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });

  if (error) {
    return { error: error.message };
  }

  return {};
};
