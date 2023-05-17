import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { Session } from 'next-auth';

export const getSession = async (): Promise<Session | null> => {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    return null;
  }
};

export const getUser = async (): Promise<Session['user'] | undefined> => {
  try {
    const session = await getSession();

    return session?.user;
  } catch (error) {
    return undefined;
  }
};
