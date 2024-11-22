import { MagicLinkTemplate } from '@repo/email/templates/magic-link';

const ExampleMagicLinkEmail = () => (
  <MagicLinkTemplate
    loginUrl="https://app.shipkit.dev/login?token=123"
    expiresIn="10 minutes"
  />
);

export default ExampleMagicLinkEmail;
