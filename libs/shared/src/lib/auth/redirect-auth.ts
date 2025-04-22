import { redirect } from '@remix-run/react';

export const redirectToAuth = (request: Request) => {
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
  console.log('authorizeUrl:', authorizeUrl.toString());
  return redirect(authorizeUrl.toString());
};
