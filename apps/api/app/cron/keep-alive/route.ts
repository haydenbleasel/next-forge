import { database } from '@repo/database';

export const GET = async () => {
  const newPage = await database.page.create({
    data: {
      name: 'cron-temp',
      email: 'test@test.com',
    },
  });

  await database.page.delete({
    where: {
      id: newPage.id,
    },
  });

  return new Response('OK', { status: 200 });
};
