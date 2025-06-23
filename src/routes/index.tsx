import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { createFileRoute } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const { name, email, password } = Object.fromEntries(formData);

    const { data, error } = await authClient.signUp.email(
      {
        email: email as string,
        password: password as string,
        name: name as string,
        callbackURL: '/dashboard',
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          redirect({ to: '/dashboard', replace: true });
        },
        onError: (ctx) => {
          // display the error message
          console.log(ctx.error.message);
          alert(ctx.error.message);
        },
      }
    );
  };
  return (
    <form className="flex flex-col gap-4 p-10" onSubmit={handleSubmit}>
      <Input type="text" name="name" />
      <Input type="text" name="email" />
      <Input type="password" name="password" />
      <Button type="submit">Signup</Button>
    </form>
  );
}
