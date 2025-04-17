// libs/shared/src/lib/api/client.ts

import axios from 'axios';
import { parse } from 'cookie';
import { useTokenStore } from '../store';
import { useCallback, useEffect } from 'react';

let accessTokenRef: string | null = null;
export const setAccessTokenRef = (token: string | null) => {
  accessTokenRef = token;
};

// access_token getter from document.cookie
function getAccessTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = parse(document.cookie);
  return cookies['access_token'] ?? null;
}

// axios instance with interceptor for refresh
const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true, // send cookies (refresh_token)
  headers: {
    'Content-Type': 'application/json',
  },
});

// refresh 호출 후 쿠키 기반으로 access_token 재설정되도록 유도
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // refresh 요청
        await axios.post('/api/auth/refresh', null, {
          withCredentials: true,
        });

        // retry original request
        const accessToken = getAccessTokenFromCookie();
        if (accessTokenRef) {
          error.config.headers['Authorization'] = `Bearer ${accessTokenRef}`;
          return apiClient.request(error.config);
        }
      } catch (refreshError) {
        console.error('refresh failed');
      }
    }
    return Promise.reject(error);
  }
);

export const useClientFetch = () => {
  const accessToken = useTokenStore((s) => s.accessToken);

  useEffect(() => {
    setAccessTokenRef(accessToken);
  }, [accessToken]);

  const clientFetch = useCallback(
    async (query: string) => {
      const res = await apiClient.post(
        '/graphql',
        { query },
        {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        }
      );

      return res.data;
    },
    [accessToken]
  );

  return clientFetch;
};
