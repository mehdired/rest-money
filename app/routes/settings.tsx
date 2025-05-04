import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createFileRoute } from '@tanstack/react-router';
import { type FormEvent } from 'react';

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const saveSettings = (event: FormEvent<HTMLFormElement>) => {};

  return (
    <div className="container">
      <Card className="p-10">
        <form className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between">
            <Label htmlFor="tva">TVA</Label>
            <Input className="bg-white w-3/4" type="text" name="tva" id="tva" />
          </div>
          <div className="flex gap-4 justify-between">
            <Label htmlFor="urssaf">URSSAF</Label>
            <Input className="bg-white w-3/4" type="text" name="urssaf" id="urssaf" />
          </div>
          <Button>Save</Button>
        </form>
      </Card>
    </div>
  );
}
