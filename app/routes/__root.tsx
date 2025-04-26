import { type ReactNode } from 'react';
import { Outlet, createRootRoute, HeadContent, Scripts, Link } from '@tanstack/react-router';
import appCss from '../styles/app.css?url';

export const Route = createRootRoute({
  head: () => ({
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
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
        title: 'TanStack Start Starter',
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
  return (
    <html>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        <HeadContent />
      </head>
      <body>
        <header>
          <nav className="flex items-center gap-4 container py-2 justify-center">
            <Link to="/" className="[&.active]:font-bold [&.active]:cursor-auto">
              Dashboard
            </Link>
            <Link to="/income" className="[&.active]:font-bold [&.active]:cursor-auto">
              Income
            </Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
