import { type ReactNode } from 'react';
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Link,
} from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { TrendingUp } from 'lucide-react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { DesktopNav, MobileNav } from 'src/components/ui/navigation';
import { Toaster } from 'src/components/ui/sonner';
import appCss from '../styles/app.css?url';
import { getUser } from '@/lib/auth-server-fn';
import { useSession } from '@/lib/auth-client';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ['user'],
      queryFn: getUser,
    });
    return {
      user,
    };
  },
  head: () => ({
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
    scripts: [
      {
        defer: true,
        src: 'https://analytics.mcheniki.dev/js/script.js',
        'data-domain': 'restmoney.mcheniki.dev',
      },
    ],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Rest Money - Freelance Income Tracker',
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { data: session } = useSession();

  return (
    <html>
      <head>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
        <HeadContent />
      </head>
      <body className="min-h-screen bg-background">
        {session?.user && (
          <header className="border-b-2 border-border bg-secondary-background shadow-shadow">
            <div className="container">
              <nav className="flex items-center justify-between py-4">
                {/* Logo/Brand */}
                <div className="flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className="p-2 bg-main border-2 border-border rounded-base shadow-shadow"
                  >
                    <TrendingUp className="h-6 w-6 text-main-foreground" />
                  </Link>
                  <div>
                    <h1 className="text-xl font-heading text-foreground">Rest Money</h1>
                    <p className="text-xs text-foreground/70">Freelance Tracker</p>
                  </div>
                </div>
                <DesktopNav />
                <MobileNav />
              </nav>
            </div>
          </header>
        )}

        <main className="flex-1 min-h-screen">
          {session?.user && (
            <div className="container py-5">
              <p>Connecté en tant que {session.user.name}</p>
            </div>
          )}
          {children}
        </main>

        <Toaster richColors position="top-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
