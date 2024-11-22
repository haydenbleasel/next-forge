import { WelcomeTemplate } from '@repo/email/templates/welcome';

const ExampleWelcomeEmail = () => (
  <WelcomeTemplate
    name="Jane Smith"
    verificationUrl="https://app.shipkit.dev/verify?token=123"
  />
);

export default ExampleWelcomeEmail;
