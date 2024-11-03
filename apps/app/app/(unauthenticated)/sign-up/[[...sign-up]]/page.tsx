import { createMetadata } from '@repo/design-system/lib/metadata';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const title = 'Create an account';
const description = 'Enter your details to get started.';
const SignUp = dynamic(() => import('@clerk/nextjs').then((mod) => mod.SignUp));

export const metadata: Metadata = createMetadata({ title, description });

const SignUpPage = () => (
  <>
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="font-semibold text-2xl tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
    <SignUp
      appearance={{
        elements: {
          header: 'hidden',
        },
      }}
    />
  </>
);

export default SignUpPage;
