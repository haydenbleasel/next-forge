import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import type { FC } from 'react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000/';

type LoginEmailTemplateProps = {
  readonly url: string;
};

export const LoginEmailTemplate: FC<LoginEmailTemplateProps> = ({ url }) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Login to Superlight</Preview>
      <Body className="bg-zinc-50 font-sans">
        <Container className="mx-auto py-12">
          <Img
            src={`${baseUrl}/logo-full.svg`}
            width="108"
            height="20"
            alt="Superlight"
          />
          <Section className="bg-zinc-200 p-px mt-8 rounded-md">
            <Section className="p-8 bg-white rounded-[5px]">
              <Text className="mt-0 mb-4 text-2xl font-semibold text-zinc-950">
                Login to Superlight
              </Text>

              <Text className="m-0 text-zinc-500">
                You are receiving this email because you (or someone else) have
                requested the link to sign in to your account. Click the button
                below to sign in.
              </Text>

              <Button
                pX={16}
                pY={10}
                className="mt-4 bg-emerald-500 rounded-md text-white text-base font-semibold no-underline text-center inline-block"
                href={url}
              >
                Login to Superlight
              </Button>
            </Section>
          </Section>
          <Section className="py-8">
            <Text className="m-0 text-zinc-500">
              This email was sent to you because you have an account with
              Superlight, or you are creating one. If you did not request this,
              please ignore this email.
            </Text>
            <Text className="text-zinc-500">
              &copy; {new Date().getFullYear()}{' '}
              <Link
                className="text-emerald-600 underline"
                href="https://www.beskar.co/"
              >
                Beskar Labs
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

const ExampleSyncEmail: FC = () => (
  <LoginEmailTemplate url="https://www.superlight.app/" />
);

export default ExampleSyncEmail;
