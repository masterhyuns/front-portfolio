// libs/shared/src/auth/cookie.util.ts
export const parseCookies = (request: Request): Record<string, string> => {
  const cookie = request.headers.get('Cookie') ?? '';
  return Object.fromEntries(
    cookie
      .split(';')
      .map((c) => c.trim().split('='))
      .filter(([k, v]) => k && v)
  );
};
