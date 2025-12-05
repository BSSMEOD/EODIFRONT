import { create } from 'zustand';
import { User } from '@/types/user/client';
import { logoutApi } from '@/api/auth/auth';

interface AuthState extends User {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  updateAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  name: '',
  authority: 'STUDENT',
  isLoggedIn: false,
  accessToken: null,

  login: (user, token) =>
    set({
      ...user,
      isLoggedIn: true,
      accessToken: token,
    }),

  logout: async () => {
    const { accessToken } = useAuthStore.getState();
    await logoutApi(accessToken);

    set({
      name: '',
      authority: 'STUDENT',
      isLoggedIn: false,
      accessToken: null,
    });
  },

  updateAccessToken: (token) =>
    set({
      accessToken: token,
    }),
}));
