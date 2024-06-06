import { createServerClient } from '@repo/database/lib/server';
import { redirect } from 'next/navigation';
import type { ReactElement } from 'react';

type AuthenticatedLayoutProperties = {
  readonly children: ReactElement;
};

const AuthenticatedLayout = async ({
  children,
}: AuthenticatedLayoutProperties): Promise<ReactElement> => {
  const supabase = createServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data.user) {
    redirect('/login');
  }

  return children;
};

export default AuthenticatedLayout;
