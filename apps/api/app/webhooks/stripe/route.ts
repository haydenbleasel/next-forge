import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { log } from '@logtail/next';
import { stripe } from '@repo/design-system/lib/stripe';
import { parseError } from '@repo/design-system/lib/error';

const secret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

export const POST = async (request: Request): Promise<Response> => {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      throw new Error('missing stripe-signature header');
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case 'checkout.session.completed': {
        log.info('checkout.session.completed');
        break;
      }
      case 'payment_intent.succeeded': {
        log.info('payment_intent.succeeded');
        break;
      }
      case 'payment_intent.payment_failed': {
        log.info('payment_intent.payment_failed');
        break;
      }
      default: {
        log.warn(`Unhandled event type ${event.type}`);
      }
    }

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
