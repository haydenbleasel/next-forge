import { SignIn } from '@clerk/nextjs';
import type { FC } from 'react';

const SignInPage: FC = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-100 dark:bg-black">
    <SignIn />
  </div>
);

export default SignInPage;
