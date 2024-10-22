import type { WebhookEvent } from '@clerk/nextjs/server';
import { log } from '@logtail/next';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export const POST = async (request: Request): Promise<Response> => {
  if (!process.env.CLERK_WEBHOOK_SECRET) {
    throw new Error(
      'Please add process.env.CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = (await request.json()) as object;
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  // eslint-disable-next-line no-undef-init
  let event: WebhookEvent | undefined;

  // Verify the payload with the headers
  try {
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    log.error('Error verifying webhook:', { error });
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = event.data;
  const eventType = event.type;

  log.info('Webhook', { id, eventType, body });

  return new Response('', { status: 201 });
};
