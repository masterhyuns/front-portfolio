import { authSession } from './session.server';

export async function getAccessTokenFromSession(request: Request) {
  const session = await authSession.getSession(request.headers.get('Cookie'));
  return session.get('access_token') as string | null;
}
