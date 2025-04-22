import { type ActionFunctionArgs } from '@remix-run/node';
import {
  authSession,
  getSessionIdFromRequest,
  redisConnect,
} from '@portfolio/server-shared';
import { json } from '@portfolio/shared';
import { revokeAccessToken } from '@portfolio/features';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, sessionId } = await getSessionIdFromRequest(request);
  const tokenInfoStr = await redisConnect.get(`${sessionId}`);
  if (tokenInfoStr) {
    const tokenInfo = JSON.parse(tokenInfoStr + '');
    await revokeAccessToken(tokenInfo.accessToken);
  }
  if (session) {
    session.unset('session_id');
  }
  if (sessionId) {
    await redisConnect.del(sessionId);
  }
  return json(
    {},
    {
      headers: {
        'Set-Cookie': [
          await authSession.destroySession(session), // Remix 세션 제거
          'JSESSIONID=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax', // Spring 세션 제거
        ],
      },
    }
  );
};
