import { auth, currentUser } from '@clerk/nextjs/server';
import { authenticate } from '@repo/collaboration/auth';

export const POST = async () => {
  const user = await currentUser();
  const { orgId } = await auth();

  if (!user || !orgId) {
    return new Response('Unauthorized', { status: 401 });
  }

  return authenticate({
    userId: user.id,
    orgId,
    userInfo: {
      name:
        user.fullName ?? user.emailAddresses.at(0)?.emailAddress ?? undefined,
      avatar: user.imageUrl ?? undefined,
    },
  });
};
