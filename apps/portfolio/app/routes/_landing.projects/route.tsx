import { ComponentLayout } from '@portfolio/ui';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useActionData, useNavigate } from '@remix-run/react';
import { json, useTokenStore, useClientFetch } from '@portfolio/shared';
import { useEffect } from 'react';
import { redirect } from 'react-router';
import { authSession } from '@portfolio/server-shared';
import Redis from 'ioredis';
import { action } from '../login';
const redisConnect = new Redis({
  host: 'localhost',
  port: 6379,
});
// 인증 로직 (예시: 세션 쿠키 확인)
export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const session = await authSession.getSession(request.headers.get('Cookie'));
    const sessionId = await session.get('session_id');
    const tokenInfoStr = await redisConnect.get(sessionId);
    if (!sessionId || !tokenInfoStr) {
      return redirect('/login');
    }
    const tokenInfo = JSON.parse(tokenInfoStr) as {
      accessToken: string;
      refreshToken: string;
    };

    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenInfo.accessToken}`,
      },
      body: JSON.stringify({ query: '{ me { email } }' }),
    });
    const result = await response.json();
    if (response.status !== 200 && (!result || !result.data)) {
      return redirect('/login');
    }
    return json(result.data);
  } catch (e: any) {
    console.log(e);
  }
  return json({});
};

const Route = () => {
  const clientFetch = useClientFetch();
  const me = async () => {
    await clientFetch('{ me { email } }');
  };

  const refresh = async () => {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });
    console.log('refresh', await response.json());
  };
  return (
    <ComponentLayout>
      <button onClick={() => me()}>미</button>
      <button onClick={() => refresh()}>리프레시</button>
      <Outlet />
    </ComponentLayout>
  );
};
export default Route;
