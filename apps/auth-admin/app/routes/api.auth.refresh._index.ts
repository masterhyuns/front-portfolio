import { type ActionFunctionArgs } from '@remix-run/node';
import {
  commitSessionWithId,
  getSessionIdFromRequest,
  redisConnect,
} from '@portfolio/server-shared';
import { refreshAccessToken } from '@portfolio/features';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, sessionId } = await getSessionIdFromRequest(request);

  if (!sessionId) return new Response('Unauthorized', { status: 401 });

  const tokenInfoStr = await redisConnect.get(`${sessionId}`);
  if (!tokenInfoStr) return new Response('Unauthorized', { status: 401 });
  const tokenInfo = JSON.parse(tokenInfoStr);

  try {
    const { access_token, refresh_token } = await refreshAccessToken({
      refreshToken: tokenInfo.refreshToken,
      clientId: 'test-client',
    });
    await redisConnect.set(
      sessionId,
      JSON.stringify({
        accessToken: access_token,
        refreshToken: refresh_token,
      }),
      'EX',
      60 * 60 * 24 * 7
    );
    session.set('session_id', sessionId);
    return await commitSessionWithId(session, sessionId, {
      accessToken: access_token,
    });
  } catch (error) {
    session.unset('session_id');
  }
};
