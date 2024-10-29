import { type ApiData, verifyAccess } from '@vercel/flags';
import { type NextRequest, NextResponse } from 'next/server';
import * as flags from './index';

export const getFlags = async (request: NextRequest) => {
  const access = await verifyAccess(request.headers.get('Authorization'));

  if (!access) {
    return NextResponse.json(null, { status: 401 });
  }

  const definitions = Object.fromEntries(
    Object.entries(flags).map(([key, flag]) => [
      key,
      {
        origin: flag.origin,
        description: flag.description,
        options: flag.options,
      },
    ])
  );

  return NextResponse.json<ApiData>({
    definitions,
  });
};
