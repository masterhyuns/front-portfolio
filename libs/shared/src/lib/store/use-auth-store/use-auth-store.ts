// libs/shared/src/lib/store/useAuthStore
import { create } from 'zustand';
import { AuthUser } from './types';

interface AuthState {
  auth: AuthUser | null;
  setAuth: (auth: AuthUser) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: null,
  setAuth: (auth) => set({ auth }),
  clearToken: () => set({ auth: null }),
}));
