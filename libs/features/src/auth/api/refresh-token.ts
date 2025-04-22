import { RefreshAccessTokenProps } from './types';
import { ApiResponse } from '@portfolio/server-shared';
import { Token } from '@portfolio/server-entities';

export const refreshAccessToken = async ({
  refreshToken,
  clientId,
}: RefreshAccessTokenProps): Promise<Token> => {
  const res = await fetch('http://localhost:8080/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  });
  const response = (await res.json()) as ApiResponse<Token>;
  if (response.status !== 200) {
    throw new Error('Failed to refresh token');
  }
  return response.data;
};
