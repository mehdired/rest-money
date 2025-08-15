import { dbGetSettings } from '@/db';
import { authMiddleware } from '@/lib/auth-middleware';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createServerFn } from '@tanstack/react-start';

const getSettingsFn = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .handler(async () => {
    return await dbGetSettings();
  });

export const getSettingsQueryOptions = queryOptions({
  queryKey: ['settings'],
  queryFn: getSettingsFn,
});

export function useSettings() {
  return useSuspenseQuery(getSettingsQueryOptions).data;
}
