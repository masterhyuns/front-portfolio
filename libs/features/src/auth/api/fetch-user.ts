import type { User } from '@portfolio/entities';

export async function fetchUserInfo(accessToken: string): Promise<User> {
  const res = await fetch('http://localhost:8080/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user info');
  }

  return res.json();
}
