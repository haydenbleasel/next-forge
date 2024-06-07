'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';
import { Label } from '@repo/design-system/components/ui/label';
import { useState } from 'react';
import { LoadingCircle } from '@repo/design-system/components/loading-circle';
import { handleError } from '@repo/design-system/lib/error';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@repo/design-system/components/ui/input-otp';
import { login } from '../actions/login';
import { GitHubAuthButton } from '../../components/github-auth-button';
import { verify } from '../actions/verify';
import type { FC, FormEventHandler } from 'react';

export const LoginForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);

  const onSubmitLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await login(email);

      if (response?.error) {
        throw new Error(response.error);
      }

      setSent(true);
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  const onSubmitVerify: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await verify(email, code);

      if (response?.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  if (sent) {
    <div className="grid gap-6">
      <form onSubmit={onSubmitVerify}>
        <InputOTP
          maxLength={6}
          value={code}
          onChange={setCode}
          disabled={loading}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </form>
    </div>;
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmitLogin}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button disabled={loading} className="gap-2">
            {loading ? <LoadingCircle /> : undefined}
            Sign In with Email
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
