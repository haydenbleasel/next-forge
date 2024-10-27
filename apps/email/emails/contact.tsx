import { ContactTemplate } from '@repo/email-templates/contact';
import type { FC } from 'react';

const ExampleContactEmail = () => (
  <ContactTemplate
    name="Jane Smith"
    email="jane.smith@example.com"
    message="I'm interested in your services."
  />
);

export default ExampleContactEmail;
