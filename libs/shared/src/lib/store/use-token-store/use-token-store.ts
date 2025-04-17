// libs/shared/src/lib/store/useTokenStore.ts
import { create } from 'zustand';

interface TokenState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearToken: () => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearToken: () => set({ accessToken: null }),
}));
