import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const secret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      throw new Error('missing stripe-signature header');
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('checkout.session.completed');
        break;
      case 'payment_intent.succeeded':
        console.log('payment_intent.succeeded');
        break;
      case 'payment_intent.payment_failed':
        console.log('payment_intent.payment_failed');
        break;
      default:
        console.warn(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'something went wrong',
        ok: false,
      },
      { status: 500 }
    );
  }
};
