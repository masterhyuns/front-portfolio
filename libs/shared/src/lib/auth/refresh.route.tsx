import { ActionFunctionArgs } from '@remix-run/node';
import { authSession } from './session.server';
import { json } from '../response/json';

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await authSession.getSession(request.headers.get('Cookie'));
  const currentToken = session.get('access_token');

  const res = await fetch('http://localhost:4000/api/auth/refresh', {
    method: 'POST',
    headers: {
      Cookie: request.headers.get('Cookie') ?? '',
      Authorization: `Bearer ${currentToken}`,
    },
    credentials: 'include',
  });

  if (!res.ok) return new Response(null, { status: 401 });

  const { access_token } = await res.json();
  session.set('access_token', access_token);

  return json(
    { access_token },
    {
      headers: {
        'Set-Cookie': await authSession.commitSession(session),
      },
    }
  );
};
