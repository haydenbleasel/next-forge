import { SignUp } from '@clerk/nextjs';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { FC } from 'react';

const title = 'Sign Up';
const description = 'Sign Up to your account.';
const path = '/sign-up';

export const metadata: Metadata = createMetadata({ title, description, path });

const SignUpPage: FC = () => (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <SignUp />
  </div>
);

export default SignUpPage;
