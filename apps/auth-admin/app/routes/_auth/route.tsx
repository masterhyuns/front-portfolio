import { useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from 'react-router';
import {
  commitSessionWithId,
  getSessionIdFromRequest,
  redirectToAuth,
  redisConnect,
} from '@portfolio/server-shared';
import { setAccessToken } from '@portfolio/shared';
import { useEffect } from 'react';
import { fetchUserInfo } from '@portfolio/features';
import { AuthAdminLayout } from '@portfolio/widgets';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, sessionId } = await getSessionIdFromRequest(request);
  if (!sessionId) return redirectToAuth(request);

  const tokenInfoStr = await redisConnect.get(sessionId);
  if (!tokenInfoStr) return redirectToAuth(request);

  const { accessToken } = JSON.parse(tokenInfoStr);
  try {
    const user = await fetchUserInfo(accessToken);
    return commitSessionWithId(session, sessionId, { accessToken, user });
  } catch (error) {
    return redirectToAuth(request);
  }
};

const Route = () => {
  const { accessToken } = useLoaderData<typeof loader>();

  useEffect(() => {
    setAccessToken(accessToken);
  }, [accessToken]);

  return <AuthAdminLayout></AuthAdminLayout>;
};

export default Route;
