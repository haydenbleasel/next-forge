/* eslint-disable import/named */

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import type { FC } from 'react';

type ContactTemplateProps = {
  readonly name: string;
  readonly email: string;
  readonly message: string;
};

export const ContactTemplate: FC<ContactTemplateProps> = ({
  name,
  email,
  message,
}) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>New email from {name}</Preview>
      <Body className="bg-zinc-50 font-sans">
        <Container className="mx-auto py-12">
          <Section className="bg-zinc-200 p-px mt-8 rounded-md">
            <Section className="p-8 bg-white rounded-[5px]">
              <Text className="mt-0 mb-4 text-2xl font-semibold text-zinc-950">
                New email from {name}
              </Text>
              <Text className="m-0 text-zinc-500">
                {name} ({email}) has sent you a message:
              </Text>
              <Hr className="my-4" />
              <Text className="m-0 text-zinc-500">{message}</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

const ExampleContactEmail: FC = () => (
  <ContactTemplate
    name="Jane Smith"
    email="jane@example.com"
    message="Hello, how do I get started?"
  />
);

export default ExampleContactEmail;
