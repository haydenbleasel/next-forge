import { env } from '@repo/env';
import { StripeAgentToolkit } from '@stripe/agent-toolkit/ai-sdk';

export const paymentsAgentToolkit = new StripeAgentToolkit({
  secretKey: env.STRIPE_SECRET_KEY,
  configuration: {
    actions: {
      paymentLinks: {
        create: true,
      },
      products: {
        create: true,
      },
      prices: {
        create: true,
      },
    },
  },
});
