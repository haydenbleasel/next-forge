import { SubscriptionTemplate } from '@repo/email/templates/subscription';

const ExampleSubscriptionEmail = () => (
  <SubscriptionTemplate
    planName="Pro Plan"
    startDate="March 15, 2024"
    amount="$49/month"
  />
);

export default ExampleSubscriptionEmail;
