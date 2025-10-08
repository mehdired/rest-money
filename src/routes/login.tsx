import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth-client';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

const getTestCredentials = createServerFn({ method: 'GET' }).handler(() => {
  return {
    email: process.env.TEST_LOGIN!,
    password: process.env.TEST_PASSWORD!,
  };
});

export const Route = createFileRoute('/login')({
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

  const handleTestLogin = async () => {
    const testCredential = await getTestCredentials();

    await signIn.email(
      {
        email: testCredential.email,
        password: testCredential.password,
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
    <div className="flex flex-col gap-4 max-w-md mx-auto p-10">
      <form className="flex flex-col gap-4  items-center justify-center" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="password">Mot de passe</Label>
          <Input type="password" name="password" />
        </div>
        <Button type="submit" className="cursor-pointer w-full">
          Connexion
        </Button>
      </form>
      <p className="text-sm text-foreground font-bold text-center w-full">Ou</p>
      <Button variant="neutral" className="cursor-pointer" onClick={handleTestLogin}>
        Connexion avec un compte test
      </Button>
    </div>
  );
}
