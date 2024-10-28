import { log } from '@logtail/next';
import { analytics } from '@repo/design-system/lib/analytics/server';
import { parseError } from '@repo/design-system/lib/error';
import { stripe } from '@repo/design-system/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const secret = process.env.STRIPE_WEBHOOK_SECRET;

if (!secret) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not set');
}

const handleCheckoutSessionCompleted = (data: object) => {
  log.info('checkout.session.completed', { data });
};

const handlePaymentIntentSucceeded = (data: object) => {
  log.info('payment_intent.succeeded', { data });
};

const handlePaymentIntentPaymentFailed = (data: object) => {
  log.info('payment_intent.payment_failed', { data });
};

export const POST = async (request: Request): Promise<Response> => {
  try {
    const body = await request.text();
    const headerPayload = await headers();
    const signature = headerPayload.get('stripe-signature');

    if (!signature) {
      throw new Error('missing stripe-signature header');
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case 'checkout.session.completed': {
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      }
      case 'payment_intent.succeeded': {
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      }
      case 'payment_intent.payment_failed': {
        await handlePaymentIntentPaymentFailed(event.data.object);
        break;
      }
      default: {
        log.warn(`Unhandled event type ${event.type}`);
      }
    }

    await analytics.shutdown();

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    const message = parseError(error);

    log.error(message);

    return NextResponse.json(
      {
        message: 'something went wrong',
        ok: false,
      },
      { status: 500 }
    );
  }
};
