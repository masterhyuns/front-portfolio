import Redis from 'ioredis';
import { LoaderFunctionArgs, redirect } from 'react-router';
import { ApiResponse, authSession } from '@portfolio/server-shared';
import { Token } from '@portfolio/server-entities';
import { json } from '@portfolio/shared';

const redisConnect = new Redis({
  host: 'localhost',
  port: 6379,
});
export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log('혹시 여기 오는거야? ');
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
  const tokenResponse = (await tokenRes.json()) as ApiResponse<Token>; // { access_token, refresh_token, ... }
  switch (tokenResponse.status) {
    case 200: {
      const token = tokenResponse.data;
      const session = await authSession.getSession(
        request.headers.get('Cookie')
      );
      const sessionId = crypto.randomUUID();
      session.set('session_id', sessionId);
      await redisConnect.set(
        sessionId,
        JSON.stringify({
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expiresIn: token.expires_in,
        }),
        'EX',
        60 * 60 * 24 * 7
      );
      return redirect(state, {
        headers: {
          'Set-Cookie': await authSession.commitSession(session),
        },
      });
    }
    default:
      return json({});
  }
};

const CallbackPage = () => {
  return <div>CallbackPage</div>;
};
export default CallbackPage;
