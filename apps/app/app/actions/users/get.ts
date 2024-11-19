'use server';

import {
  type OrganizationMembership,
  auth,
  clerkClient,
} from '@repo/auth/server';
import { tailwind } from '@repo/tailwind-config';

const getName = (user: OrganizationMembership): string | undefined => {
  let name = user.publicUserData?.firstName;

  if (name && user.publicUserData?.lastName) {
    name = `${name} ${user.publicUserData.lastName}`;
  } else if (!name) {
    name = user.publicUserData?.identifier;
  }

  return name;
};

const colors = [
  tailwind.theme.colors.red[500],
  tailwind.theme.colors.orange[500],
  tailwind.theme.colors.amber[500],
  tailwind.theme.colors.yellow[500],
  tailwind.theme.colors.lime[500],
  tailwind.theme.colors.green[500],
  tailwind.theme.colors.emerald[500],
  tailwind.theme.colors.teal[500],
  tailwind.theme.colors.cyan[500],
  tailwind.theme.colors.sky[500],
  tailwind.theme.colors.blue[500],
  tailwind.theme.colors.indigo[500],
  tailwind.theme.colors.violet[500],
  tailwind.theme.colors.purple[500],
  tailwind.theme.colors.fuchsia[500],
  tailwind.theme.colors.pink[500],
  tailwind.theme.colors.rose[500],
];

export const getUsers = async (
  userIds: string[]
): Promise<
  | {
      data: Liveblocks['UserMeta']['info'][];
    }
  | {
      error: unknown;
    }
> => {
  try {
    const { orgId } = await auth();

    if (!orgId) {
      throw new Error('Not logged in');
    }

    const clerk = await clerkClient();

    const members = await clerk.organizations.getOrganizationMembershipList({
      organizationId: orgId,
      limit: 100,
    });

    const data: Liveblocks['UserMeta']['info'][] = members.data
      .filter(
        (user) =>
          user.publicUserData?.userId &&
          userIds.includes(user.publicUserData.userId)
      )
      .map((user) => ({
        name: getName(user) ?? 'Unknown user',
        picture: user.publicUserData?.imageUrl ?? '',
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

    return { data };
  } catch (error) {
    return { error };
  }
};
