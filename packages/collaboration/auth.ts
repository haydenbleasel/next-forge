import 'server-only';
import { Liveblocks } from '@liveblocks/node';

const liveblocks = new Liveblocks({
  secret: 'sk_prod_xxxxxxxxxxxxxxxxxxxxxxxx',
});

type AuthenticateOptions = {
  userId: string;
  orgId: string;
};

export const authenticate = async ({ userId, orgId }: AuthenticateOptions) => {
  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(userId, { userInfo: {} });

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user write access on their group
  session.allow(`${orgId}:*`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();

  return new Response(body, { status });
};
