'use client';

import { useState } from 'react';
import { Button } from '@repo/design-system/components/ui/button';
import { handleError } from '~/lib/error';
import { logout } from './logout';
import type { FC } from 'react';

export const LogoutButton: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await logout();

      if (response?.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="secondary" onClick={handleClick} disabled={loading}>
      Logout
    </Button>
  );
};
