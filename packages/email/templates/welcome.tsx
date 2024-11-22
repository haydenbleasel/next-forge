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

type WelcomeTemplateProps = {
  readonly name: string;
  readonly verificationUrl: string;
};

export const WelcomeTemplate = ({
  name,
  verificationUrl,
}: WelcomeTemplateProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Welcome to ShipKit! 🚀</Preview>
      <Body className="bg-zinc-50 font-sans">
        <Container className="mx-auto py-12">
          <Section className="mt-8 rounded-md bg-zinc-200 p-px">
            <Section className="rounded-[5px] bg-white p-8">
              <EmailHeader />
              <Heading className="mt-0 mb-4 text-2xl font-semibold text-zinc-950">
                Welcome aboard, {name}!
              </Heading>
              <Text className="m-0 mb-4 text-zinc-500">
                We're thrilled to have you join ShipKit. Let's get your account
                verified so you can start building amazing things.
              </Text>
              <Button
                className="rounded-lg bg-blue-600 px-6 py-3 text-center text-white"
                href={verificationUrl}
              >
                Verify Email
              </Button>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

const ExampleWelcomeEmail = () => (
  <WelcomeTemplate
    name="Jane Smith"
    verificationUrl="https://app.shipkit.dev/verify?token=123"
  />
);

export default ExampleWelcomeEmail;
