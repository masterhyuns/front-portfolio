import { createCookieSessionStorage } from '@remix-run/node';
import { json } from '../response/json';

export const authSession = createCookieSessionStorage({
  cookie: {
    name: 'session',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10, // 10분
    secrets: ['your-secret'],
  },
});

export async function getSessionIdFromRequest(request: Request) {
  const cookie = request.headers.get('Cookie') ?? '';
  const session = await authSession.getSession(cookie);
  const sessionId = session.get('session_id');
  return { session, sessionId };
}

export async function commitSessionWithId(
  session: any,
  sessionId: string,
  payload: any
) {
  session.set('session_id', sessionId);
  return json(payload, {
    headers: {
      'Set-Cookie': await authSession.commitSession(session),
    },
  });
}
