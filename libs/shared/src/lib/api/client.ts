// libs/shared/src/lib/api/client.ts
import axios from 'axios';
import { parse } from 'cookie';
import { useTokenStore } from '../store';
import { useEffect } from 'react';

let accessTokenRef: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessTokenRef = token;
};

export const getAccessTokenRef = () => accessTokenRef;

// SSR 환경 보호용
function getAccessTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = parse(document.cookie);
  return cookies['access_token'] ?? null;
}

// axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true, // refresh_token 포함
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptor: 자동 refresh 후 재요청
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        console.warn('[axios] accessToken expired. Trying refresh...');

        const refreshRes = await axios.post('/api/auth/refresh', null, {
          withCredentials: true,
        });

        const { accessToken } = refreshRes.data;
        console.log(accessToken);
        setAccessToken(accessToken); // ✅ 토큰 갱신

        // 원래 요청에 새 토큰 넣고 재요청
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error('refresh failed:', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// clientFetch: 헤더 자동 주입
export const clientFetch = async <T = any>(
  url: string,
  options: Partial<{
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    params?: any;
    headers?: Record<string, string>;
  }> = {}
): Promise<T> => {
  const token = getAccessTokenRef();
  const headers: Record<string, string> = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await apiClient.request<T>({
    url,
    method: options.method || 'GET',
    headers,
    data: options.data,
    params: options.params,
    withCredentials: true,
  });

  return res.data;
};

// Hook: 상태와 accessTokenRef 동기화
