import { createMiddleware } from '@tanstack/react-start';
import { getSession } from './auth-client';

export const authMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const { data: session, error } = await getSession();

  return await next({
    context: {
      user: {
        id: session?.user.id,
        name: session?.user.name,
        email: session?.user.email,
      },
    },
  });
});
