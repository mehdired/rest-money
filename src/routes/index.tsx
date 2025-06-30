import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth-client';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/dashboard' });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const { email, password } = Object.fromEntries(formData);

    const { data, error } = await signIn.email(
      {
        email: email as string,
        password: password as string,
        callbackURL: '/dashboard',
      },
      {
        onSuccess: () => {
          navigate({ to: '/dashboard' });
        },
      }
    );
  };
  return (
    <form className="flex flex-col gap-4 p-10 items-center justify-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input type="password" name="password" />
      </div>
      <Button type="submit" className="cursor-pointer">
        Connexion
      </Button>
    </form>
  );
}
