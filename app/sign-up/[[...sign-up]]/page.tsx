import { SignUp } from '@clerk/nextjs';
import type { FC } from 'react';

const SignUpPage: FC = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-100 dark:bg-black">
    <SignUp />
  </div>
);

export default SignUpPage;
