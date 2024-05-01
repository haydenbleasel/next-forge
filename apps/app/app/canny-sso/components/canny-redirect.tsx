'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FC } from 'react';

const CannyRedirect: FC<{
  readonly token: string;
}> = ({ token }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const companyID = searchParams.get('companyID');
    const redirect = searchParams.get('redirect');

    if (
      !redirect ||
      (typeof redirect === 'string' && !redirect.startsWith('https://')) ||
      typeof companyID !== 'string'
    ) {
      toast.success('Invalid redirect URL');
      return undefined;
    }

    const redirectUrl = `https://canny.io/api/redirects/sso?companyID=${companyID}&ssoToken=${token}&redirect=${redirect}`;

    window.location.assign(redirectUrl);
    return undefined;
  }, [searchParams, token]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Redirecting...</h1>
    </div>
  );
};

export default CannyRedirect;
