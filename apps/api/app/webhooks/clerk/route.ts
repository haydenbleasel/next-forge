import type {
  DeletedObjectJSON,
  OrganizationJSON,
  OrganizationMembershipJSON,
  UserJSON,
  WebhookEvent,
} from '@clerk/nextjs/server';
import { log } from '@logtail/next';
import { analytics } from '@repo/design-system/lib/analytics';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

const handleUserCreated = (data: UserJSON) => {
  analytics.identify({
    userId: data.id,
    traits: {
      email: data.email_addresses.at(0)?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
      createdAt: new Date(data.created_at),
      avatar: data.image_url,
      phoneNumber: data.phone_numbers.at(0)?.phone_number,
    },
  });

  analytics.track({
    event: 'User Created',
    userId: data.id,
  });

  return new Response('User created', { status: 201 });
};

const handleUserUpdated = (data: UserJSON) => {
  analytics.identify({
    userId: data.id,
    traits: {
      email: data.email_addresses.at(0)?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
      createdAt: new Date(data.created_at),
      avatar: data.image_url,
      phoneNumber: data.phone_numbers.at(0)?.phone_number,
    },
  });

  analytics.track({
    event: 'User Updated',
    userId: data.id,
  });

  return new Response('User updated', { status: 201 });
};

const handleUserDeleted = (data: DeletedObjectJSON) => {
  if (data.id) {
    analytics.identify({
      userId: data.id,
      traits: {
        deleted: new Date(),
      },
    });

    analytics.track({
      event: 'User Deleted',
      userId: data.id,
    });
  }

  return new Response('User deleted', { status: 201 });
};

const handleOrganizationCreated = (data: OrganizationJSON) => {
  analytics.group({
    groupId: data.id,
    userId: data.created_by,
    traits: {
      name: data.name,
      avatar: data.image_url,
    },
  });

  analytics.track({
    event: 'Organization Created',
    userId: data.created_by,
  });

  return new Response('Organization created', { status: 201 });
};

const handleOrganizationUpdated = (data: OrganizationJSON) => {
  analytics.group({
    groupId: data.id,
    userId: data.created_by,
    traits: {
      name: data.name,
      avatar: data.image_url,
    },
  });

  analytics.track({
    event: 'Organization Updated',
    userId: data.created_by,
  });

  return new Response('Organization updated', { status: 201 });
};

const handleOrganizationMembershipCreated = (
  data: OrganizationMembershipJSON
) => {
  analytics.group({
    groupId: data.organization.id,
    userId: data.public_user_data.user_id,
  });

  analytics.track({
    event: 'Organization Member Created',
    userId: data.public_user_data.user_id,
  });

  return new Response('Organization membership created', { status: 201 });
};

const handleOrganizationMembershipDeleted = (
  data: OrganizationMembershipJSON
) => {
  // Need to unlink the user from the group

  analytics.track({
    event: 'Organization Member Deleted',
    userId: data.public_user_data.user_id,
  });

  return new Response('Organization membership deleted', { status: 201 });
};

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

  switch (eventType) {
    case 'user.created': {
      return handleUserCreated(event.data);
    }
    case 'user.updated': {
      return handleUserUpdated(event.data);
    }
    case 'user.deleted': {
      return handleUserDeleted(event.data);
    }
    case 'organization.created': {
      return handleOrganizationCreated(event.data);
    }
    case 'organization.updated': {
      return handleOrganizationUpdated(event.data);
    }
    case 'organizationMembership.created': {
      return handleOrganizationMembershipCreated(event.data);
    }
    case 'organizationMembership.deleted': {
      return handleOrganizationMembershipDeleted(event.data);
    }
    default: {
      break;
    }
  }

  return new Response('', { status: 201 });
};
