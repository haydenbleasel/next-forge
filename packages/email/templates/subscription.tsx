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

type SubscriptionTemplateProps = {
  readonly planName: string;
  readonly startDate: string;
  readonly amount: string;
};

export const SubscriptionTemplate = ({
  planName,
  startDate,
  amount,
}: SubscriptionTemplateProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Your ShipKit subscription is active! 🎉</Preview>
      <Body className="bg-zinc-50 font-sans">
        <Container className="mx-auto py-12">
          <Section className="mt-8 rounded-md bg-zinc-200 p-px">
            <Section className="rounded-[5px] bg-white p-8">
              <EmailHeader />
              <Heading className="mt-0 mb-4 text-2xl font-semibold text-zinc-950">
                Thank you for subscribing to ShipKit!
              </Heading>
              <Text className="m-0 mb-4 text-zinc-500">
                Your {planName} plan is now active. Here's a summary of your
                subscription:
              </Text>
              <Section className="mb-6 rounded-lg bg-zinc-100 p-4">
                <Text className="m-0 mb-2 font-medium text-zinc-900">
                  Plan: {planName}
                </Text>
                <Text className="m-0 mb-2 text-zinc-600">
                  Start Date: {startDate}
                </Text>
                <Text className="m-0 text-zinc-600">Amount: {amount}</Text>
              </Section>
              <Button
                className="rounded-lg bg-blue-600 px-6 py-3 text-center text-white"
                href="https://app.shipkit.dev/dashboard"
              >
                View Dashboard
              </Button>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

const ExampleSubscriptionEmail = () => (
  <SubscriptionTemplate
    planName="Pro Plan"
    startDate="March 15, 2024"
    amount="$49/month"
  />
);

export default ExampleSubscriptionEmail;
