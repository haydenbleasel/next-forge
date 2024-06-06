import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { LoadingCircle } from '@repo/design-system/components/loading-circle';
import { handleError } from '@repo/design-system/lib/error';
import { Button } from '@repo/design-system/components/ui/button';
import { useRouter } from 'next/navigation';
import { gitHubAuth } from './github-auth';
import type { FC } from 'react';

export const GitHubAuthButton: FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await gitHubAuth(
        `${window.location.origin}/auth/callback`
      );

      if (response.error) {
        handleError(response.error);
      }

      router.push('/');
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={loading}
      className="gap-2 flex item-center"
      onClick={handleClick}
    >
      {loading ? <LoadingCircle /> : <GitHubLogoIcon className="h-4 w-4" />}{' '}
      GitHub
    </Button>
  );
};
