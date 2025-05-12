import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { dbSaveSettings, dbGetSettings } from '@/db';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent } from 'react';

import { createServerFn } from '@tanstack/react-start';
import { queryOptions } from '@tanstack/react-query';
import { Settings } from '@/types';

const getSettingsFn = createServerFn({ method: 'POST', response: 'data' }).handler(async () =>
  dbGetSettings()
);

export const saveSettingsFn = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Settings) => d)
  .handler(async ({ data }) => {
    await dbSaveSettings(data);
  });

const getSettingsQueryOptions = queryOptions({
  queryKey: ['settings'],
  queryFn: getSettingsFn,
});

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(getSettingsQueryOptions);
  },
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data: allSettings } = useSuspenseQuery(getSettingsQueryOptions);

  const mutation = useMutation({
    mutationFn: saveSettingsFn,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  const saveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formInputValue = allSettings.reduce<Record<string, string>>((acc, setting) => {
      acc[setting.name] = formData.get(setting.name) as string;

      return acc;
    }, {});

    Object.entries(formInputValue).forEach(async ([name, value], index) => {
      const current = allSettings.find((settings) => settings.name === name);

      if (current && current?.value !== value) {
        mutation.mutate({
          data: {
            name,
            value,
          },
        });
      }
    });
  };

  return (
    <div className="container">
      <Card className="p-10">
        <form className="flex flex-col gap-4" onSubmit={saveSettings}>
          {allSettings.map((setting) => (
            <div className="flex gap-4 justify-between" key={setting.name}>
              <Label htmlFor={setting.name} className="uppercase">
                {setting.name}
              </Label>
              <Input
                className="bg-white w-3/4"
                type="text"
                name={setting.name}
                id={setting.name}
                defaultValue={setting.value || ''}
              />
            </div>
          ))}
          <Button type="submit" className="cursor-pointer">
            {mutation.isPending && <LoaderCircle />}
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
}
