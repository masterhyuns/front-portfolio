import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node';
import { ReactNode, useEffect } from 'react';
import { MainLayout } from '@portfolio/ui';
import { useThemeStore } from '@portfolio/shared';

export const meta: MetaFunction = () => [
  {
    title: 'New Remix App',
  },
];

export const links: LinksFunction = () => [];

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = request.headers.get('Cookie');
  const theme = cookie?.includes('theme=dark') ? 'dark' : 'light';

  // Instead of this:
  return new Response(JSON.stringify({ theme }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export function Layout({ children }: { children: ReactNode }) {
  const { theme } = useLoaderData<typeof loader>();
  useEffect(() => {
    useThemeStore.getState().setTheme(theme); // ✅ SSR 초기 theme을 zustand에 동기화
  }, [theme]);

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
