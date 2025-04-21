import { type ActionFunctionArgs } from '@remix-run/node';
import { json } from '@portfolio/shared';
import { parse } from 'cookie';
import { authSession } from '@portfolio/server-shared';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
const redisConnect = new Redis({
  host: 'localhost',
  port: 6379,
});
export const action = async ({ request }: ActionFunctionArgs) => {
  const cookie = request.headers.get('Cookie') ?? '';
  const session = await authSession.getSession(cookie);
  const sessionId = session.get('session_id');

  if (!sessionId) return new Response('Unauthorized', { status: 401 });

  const tokenInfoStr = await redisConnect.get(`${sessionId}`);
  if (!tokenInfoStr) return new Response('Unauthorized', { status: 401 });
  const tokenInfo = JSON.parse(tokenInfoStr);

  const res = await fetch('http://localhost:8080/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: tokenInfo.refreshToken,
      client_id: 'test-client',
    }),
  });

  if (!res.ok) return new Response('Refresh failed', { status: 401 });
  const { access_token, refresh_token } = await res.json();

  await redisConnect.set(
    sessionId,
    JSON.stringify({ accessToken: access_token, refreshToken: refresh_token }),
    'EX',
    60 * 60 * 24 * 7
  );
  session.set('session_id', sessionId);
  return json(
    { accessToken: access_token },
    {
      headers: {
        'Set-Cookie': await authSession.commitSession(session),
      },
    }
  );
};
