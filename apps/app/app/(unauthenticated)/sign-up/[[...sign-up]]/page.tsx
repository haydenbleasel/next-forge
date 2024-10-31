import { SignUp } from '@clerk/nextjs';
import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { createMetadata } from '@repo/design-system/lib/metadata';
import type { Metadata } from 'next';

const title = 'Sign Up';
const description = 'Sign Up to your account.';

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = () => (
  <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-secondary dark:bg-background">
    <div className="absolute top-4 right-4">
      <ModeToggle />
    </div>
    <SignUp />
  </div>
);

export default SignUpPage;
