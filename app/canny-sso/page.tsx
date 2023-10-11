import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { generateSsoToken } from '@/lib/canny';
import CannyRedirect from './components/canny-redirect';
import type { ReactElement } from 'react';

const SSO = async (): Promise<ReactElement> => {
  const user = await currentUser();

  if (!user?.id) {
    redirect('/sign-in?callbackUrl=%2Fsso');
  }

  const token = generateSsoToken(user);

  return <CannyRedirect token={token} />;
};

export default SSO;
