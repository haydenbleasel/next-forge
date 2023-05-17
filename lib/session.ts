import { getServerSession } from 'next-auth';
import * as Sentry from '@sentry/nextjs';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { Session } from 'next-auth';

export const getSession = async (): Promise<Session | null> => {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    Sentry.captureException(error);

    return null;
  }
};

export const getUser = async (): Promise<Session['user'] | undefined> => {
  try {
    const session = await getSession();

    return session?.user;
  } catch (error) {
    Sentry.captureException(error);

    return undefined;
  }
};
