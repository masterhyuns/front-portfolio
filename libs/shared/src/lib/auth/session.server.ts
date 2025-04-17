import { createCookieSessionStorage } from '@remix-run/node';

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
