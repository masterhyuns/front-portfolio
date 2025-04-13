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
import { useThemeStore } from '@portfolio/shared';
import { darkTheme, lightTheme } from '@portfolio/theme';
import '@portfolio/ui/styles/styles.css.ts';
import { ModalProvider } from '@portfolio/ui'; // ✅ 깔끔하고 안정적

export const meta: MetaFunction = () => [
  {
    title: 'Front Portfolio',
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

export default function App() {
  const { theme } = useLoaderData<typeof loader>();
  const themeClass = theme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    useThemeStore.getState().setTheme(theme); // ✅ SSR 초기 theme을 zustand에 동기화
  }, [theme]);

  return (
    <html lang="en" className={themeClass}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ModalProvider>
          <Outlet />
        </ModalProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
