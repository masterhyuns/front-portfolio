import {
  Link,
  Outlet,
  useActionData,
  useLoaderData,
  useNavigate,
} from '@remix-run/react';
import Redis from 'ioredis';
import { LoaderFunctionArgs, redirect } from 'react-router';
import { authSession } from '@portfolio/server-shared';
import {
  json,
  useAuthStore,
  clientFetch,
  setAccessToken,
  useTokenStore,
} from '@portfolio/shared';
import { useEffect } from 'react';
import { Button } from '@portfolio/ui';

const redisConnect = new Redis({
  host: 'localhost',
  port: 6379,
});
function redirectToLogin(request: Request) {
  const redirectTo = new URL(request.url).pathname;

  const authorizeUrl = new URL('http://localhost:8080/authorize');
  authorizeUrl.searchParams.set('client_id', 'test-client');
  authorizeUrl.searchParams.set(
    'redirect_uri',
    'http://localhost:5173/callback'
  );
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('scope', 'read');
  authorizeUrl.searchParams.set('state', redirectTo);

  return redirect(authorizeUrl.toString());
}
// app/root.tsx 또는 app/routes/admin.tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await authSession.getSession(request.headers.get('Cookie'));
  const sessionId = await session.get('session_id');
  const tokenInfoStr = await redisConnect.get(sessionId);

  if (!sessionId || !tokenInfoStr) {
    return redirectToLogin(request);
  }
  const tokenInfo = JSON.parse(tokenInfoStr) as {
    accessToken: string;
    refreshToken: string;
  };
  try {
    const response = await fetch('http://localhost:8080/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenInfo.accessToken}`,
      },
    });

    const result = await response.json();

    if (response.status !== 200 && !result) {
      return redirectToLogin(request);
    }
    return json(
      { accessToken: tokenInfo.accessToken, user: result },
      {
        headers: {
          'Set-Cookie': await authSession.commitSession(session),
        },
      }
    );
  } catch (error) {
    console.log(error);
    return redirectToLogin(request);
  }
};

const Route = () => {
  const { accessToken, user } = useLoaderData<typeof loader>();
  const { auth } = useAuthStore();

  const handleOnClick = async () => {
    const me = await clientFetch('http://localhost:8080/me');
    console.log('me => ', me);
  };
  const handleOnClick2 = async () => {
    const me = await clientFetch('http://localhost:8081/api/me');
    console.log('me => ', me);
  };

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div>
      <p>{auth?.name}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to={'/dashboard'}>Dashboard</Link>
        <Link to={'/settings'}>Settings</Link>
        <Link to={'/users'}>Users</Link>
        <Button variant={'primary'} onClick={handleOnClick}>
          ME
        </Button>
        <Button variant={'primary'} onClick={handleOnClick2}>
          RESOURCE ME
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Route;
