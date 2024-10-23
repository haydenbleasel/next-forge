import { SignUp } from '@clerk/nextjs';
import { createMetadata } from '@repo/design-system/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Sign Up';
const description = 'Sign Up to your account.';

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage: FC = () => (
  <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-secondary">
    <SignUp />
  </div>
);

export default SignUpPage;
