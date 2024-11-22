import { Heading, Img, Section } from '@react-email/components';

export const EmailHeader = () => (
  <Section className="mb-8 text-center">
    <Img
      src="https://shipkit.io/images/logo.png"
      width="64"
      height="64"
      alt="ShipKit"
      className="mx-auto mb-4"
    />
    <Heading className="m-0 text-2xl font-bold text-zinc-950">ShipKit</Heading>
  </Section>
);
