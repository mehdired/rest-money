import { createMiddleware } from '@tanstack/react-start';
import { getSession } from './auth-client';
import { getHeaders } from '@tanstack/react-start/server';

export const authMiddleware = createMiddleware({ type: 'function' }).server(async ({ next }) => {
  const { data: session, error } = await getSession({
    fetchOptions: {
      headers: getHeaders() as HeadersInit,
    },
  });

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
