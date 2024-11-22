import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { EmailHeader } from '../components/email-header';

type MagicLinkTemplateProps = {
  readonly loginUrl: string;
  readonly expiresIn: string;
};

export const MagicLinkTemplate = ({
  loginUrl,
  expiresIn,
}: MagicLinkTemplateProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Your ShipKit login link 🔐</Preview>
      <Body className="bg-zinc-50 font-sans">
        <Container className="mx-auto py-12">
          <Section className="mt-8 rounded-md bg-zinc-200 p-px">
            <Section className="rounded-[5px] bg-white p-8">
              <EmailHeader />
              <Heading className="mt-0 mb-4 text-2xl font-semibold text-zinc-950">
                Login to ShipKit
              </Heading>
              <Text className="m-0 mb-4 text-zinc-500">
                Click the button below to securely log in to your ShipKit
                account. This link will expire in {expiresIn}.
              </Text>
              <Button
                className="rounded-lg bg-blue-600 px-6 py-3 text-center text-white"
                href={loginUrl}
              >
                Login to ShipKit
              </Button>
              <Text className="mt-4 text-sm text-zinc-400">
                If you didn't request this login link, you can safely ignore
                this email.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

const ExampleMagicLinkEmail = () => (
  <MagicLinkTemplate
    loginUrl="https://app.shipkit.dev/login?token=123"
    expiresIn="10 minutes"
  />
);

export default ExampleMagicLinkEmail;
