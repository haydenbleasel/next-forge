import { SignIn } from '@clerk/nextjs';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Sign in';
const description = 'Sign in to your account.';
const path = '/sign-in';

export const metadata: Metadata = createMetadata({ title, description, path });

const SignInPage: FC = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-100 dark:bg-black">
    <SignIn />
  </div>
);

export default SignInPage;
