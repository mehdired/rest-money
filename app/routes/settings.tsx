import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dbSaveSettings } from '@/db';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent } from 'react';

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const mutation = useMutation({
    mutationFn: dbSaveSettings,
  });

  const saveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const tva = formData.get('tva') as string;
    const urssaf = formData.get('urssaf') as string;

    if (!tva || !urssaf) {
      return;
    }

    try {
      mutation.mutate([
        {
          name: 'tva',
          value: tva,
        },
        {
          name: 'urssaf',
          value: urssaf,
        },
      ]);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  return (
    <div className="container">
      <Card className="p-10">
        <form className="flex flex-col gap-4" onSubmit={saveSettings}>
          <div className="flex gap-4 justify-between">
            <Label htmlFor="tva">TVA</Label>
            <Input className="bg-white w-3/4" type="text" name="tva" id="tva" />
          </div>
          <div className="flex gap-4 justify-between">
            <Label htmlFor="urssaf">URSSAF</Label>
            <Input className="bg-white w-3/4" type="text" name="urssaf" id="urssaf" />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Card>
    </div>
  );
}
