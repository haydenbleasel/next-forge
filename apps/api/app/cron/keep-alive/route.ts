import { database } from '@repo/database';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const pages = await database.page.count();

  return NextResponse.json({ pages });
};
