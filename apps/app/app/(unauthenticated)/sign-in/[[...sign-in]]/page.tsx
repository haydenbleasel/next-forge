import { SignIn } from '@clerk/nextjs';
import { createMetadata } from '@repo/design-system/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Sign in';
const description = 'Sign in to your account.';

export const metadata: Metadata = createMetadata({ title, description });

const SignInPage: FC = () => (
  <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-secondary">
    <SignIn />
  </div>
);

export default SignInPage;
