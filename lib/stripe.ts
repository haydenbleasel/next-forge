import 'server-only';

import { clerkClient, currentUser } from '@clerk/nextjs';
import Stripe from 'stripe';
import { parseError } from './error';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY');
}

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SITE_URL');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const createPortalUrl = async (customer: string): Promise<string> => {
  const session = await stripe.billingPortal.sessions.create({
    customer,
    return_url: new URL('/', process.env.NEXT_PUBLIC_SITE_URL).toString(),
  });

  return session.url;
};

export const createCheckoutSession = async (): Promise<{
  error?: string;
  url?: string;
}> => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error('You must be logged in to create a checkout session.');
    }

    if (!user.emailAddresses.at(0)?.emailAddress) {
      throw new Error(
        'You do not have an email address. Please contact support.'
      );
    }

    let customerId = user.privateMetadata.stripeCustomerId as
      | string
      | undefined;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses.at(0)?.emailAddress,
        name: user.firstName ?? undefined,
      });

      await clerkClient.users.updateUser(user.id, {
        privateMetadata: {
          stripeCustomerId: customer.id,
        },
      });

      customerId = customer.id;
    }

    const products = await stripe.products.list({
      active: true,
    });

    const prices = await stripe.prices.list({
      product: products.data.at(0)?.id,
      active: true,
    });

    if (!prices.data.length) {
      throw new Error('No active prices found for this product.');
    }

    const priceId = prices.data.find(
      (price) => price.active && price.recurring?.interval === 'month'
    )?.id;

    if (!priceId) {
      throw new Error('No active price found for this product.');
    }

    const returnPath = new URL('/', process.env.NEXT_PUBLIC_SITE_URL).href;

    const session = await stripe.checkout.sessions.create({
      allow_promotion_codes: true,
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_update: {
        address: 'auto',
      },
      mode: 'subscription',
      metadata: {
        userId: user.id,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
      success_url: returnPath,
      cancel_url: returnPath,
      automatic_tax: { enabled: true },
    });

    if (!session.url) {
      throw new Error('No session URL returned. Please contact support.');
    }

    return { url: session.url };
  } catch (error) {
    const message = parseError(error);

    return { error: message };
  }
};
