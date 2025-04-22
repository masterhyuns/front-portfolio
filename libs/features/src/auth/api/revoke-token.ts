export const revokeAccessToken = async (token: string) => {
  console.log('revokeAccessToken', token);
  const res = await fetch('http://localhost:8080/token/revoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      token: token,
    }),
    credentials: 'include',
  });
  console.log(res);

  if (!res.ok) {
    throw new Error('Failed to revoke token');
  }
};
