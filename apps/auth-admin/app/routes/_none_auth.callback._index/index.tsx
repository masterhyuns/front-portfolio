import Redis from 'ioredis';
import { LoaderFunctionArgs, redirect } from 'react-router';
import { authSession } from '@portfolio/server-shared';

const redisConnect = new Redis({
  host: 'localhost',
  port: 6379,
});
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state') || '/';

  if (!code) {
    throw redirect('/login');
  }

  const tokenRes = await fetch('http://localhost:8080/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: 'test-client',
      redirect_uri: 'http://localhost:5173/callback',
    }),
  });

  if (!tokenRes.ok) {
    return redirect('/login');
  }
  const tokenInfo = await tokenRes.json(); // { access_token, refresh_token, ... }
  const session = await authSession.getSession(request.headers.get('Cookie'));
  const sessionId = crypto.randomUUID();
  session.set('session_id', sessionId);
  await redisConnect.set(
    sessionId,
    JSON.stringify({
      accessToken: tokenInfo.access_token,
      refreshToken: tokenInfo.refresh_token,
      expiresIn: tokenInfo.expires_in,
    }),
    'EX',
    60 * 60 * 24 * 7
  );
  return redirect(state, {
    headers: {
      'Set-Cookie': await authSession.commitSession(session),
    },
  });
};

const CallbackPage = () => {
  return <div>CallbackPage</div>;
};
export default CallbackPage;
