// /apps/portfolio/app/routes/refresh/index.tsx
import { type ActionFunctionArgs } from '@remix-run/node';
import { json } from '@portfolio/shared';
import { parse } from 'cookie';

export const action = async ({ request }: ActionFunctionArgs) => {
  const cookie = request.headers.get('Cookie') ?? '';
  const cookies = parse(cookie || '');
  const currentAccessToken = cookies['access_token'];

  const res = await fetch('http://localhost:4000/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Cookie: cookie,
      Authorization: `Bearer ${currentAccessToken}`,
    },
  });

  if (!res.ok) return new Response(null, { status: 401 });

  const { access_token } = await res.json();

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': `access_token=${access_token}; Path=/; Max-Age=600; SameSite=Lax`,
      },
    }
  );
};
export const loader = () => {
  return new Response('Not Found', { status: 404 });
};
