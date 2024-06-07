import { createServerClient } from '@repo/database/lib/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Creating a handler to a GET request to route /auth/confirm
export const GET = async (request: NextRequest): Promise<Response> => {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = '/account';

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete('token_hash');
  redirectTo.searchParams.delete('type');

  if (token_hash && type) {
    const supabase = createServerClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      redirectTo.searchParams.delete('next');
      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error';
  return NextResponse.redirect(redirectTo);
};
