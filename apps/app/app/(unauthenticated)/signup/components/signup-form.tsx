'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { useState } from 'react';
import { LoadingCircle } from '@repo/design-system/components/loading-circle';
import { handleError } from '@repo/design-system/lib/error';
import { toast } from 'sonner';
import { signup } from '../actions/signup';
import { GitHubAuthButton } from '../../components/github-auth-button';
import type { FC, FormEventHandler } from 'react';

export const SignupForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await signup(formData, window.location.origin);

      if ('error' in response) {
        throw new Error(response.error);
      }

      toast.success(response.message);
      setSent(true);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="grid gap-6">
        <p className="text-center">Check your email to confirm your account.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading}
            />
          </div>
          <Button disabled={loading} className="gap-2">
            {loading ? <LoadingCircle /> : undefined}
            Sign up
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GitHubAuthButton />
    </div>
  );
};
