import { Button } from 'src/components/ui/button';
import { Card } from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { dbSaveSettings } from 'src/db';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { type FormEvent } from 'react';

import { createServerFn } from '@tanstack/react-start';

import { Settings } from 'src/types';
import { authMiddleware } from '@/lib/auth-middleware';
import { PageLayout } from '@/components/layout';
import { getSettingsQueryOptions, useSettings } from '@/hooks/use-settings';

export const saveSettingsFn = createServerFn({ method: 'POST' })
  .inputValidator((d: Settings) => d)
  .middleware([authMiddleware])
  .handler(async ({ data }) => {
    await dbSaveSettings(data);
  });

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/' });
    }
  },
  loader: async ({ context }) => {
    return await context.queryClient.ensureQueryData(getSettingsQueryOptions);
  },
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const allSettings = useSettings();

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
    <PageLayout title="Paramètres" description="Gérez les paramètres de votre compte">
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
            Enregistrer
          </Button>
        </form>
      </Card>
    </PageLayout>
  );
}
