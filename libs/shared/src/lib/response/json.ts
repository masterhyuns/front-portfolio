// libs/shared/src/response/json.ts
export const json = (
  data: unknown,
  options?: Record<string, any>
): Response => {
  const {
    status = 200,
    headers = {
      'Content-Type': 'application/json; charset=utf-8',
    },
  } = options ?? {};
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
  });
};
