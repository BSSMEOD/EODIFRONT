import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/user/client';
import { logoutApi } from '@/api/auth/auth';
import { Storage } from '@/api/storage/storage';
import { TOKEN } from '@/constants/common/constants';

interface AuthState extends User {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  updateAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      name: '',
      authority: 'USER',
      isLoggedIn: false,
      accessToken: null,

      login: (user, token) => {
        Storage.setItem(TOKEN.ACCESS, token);
        set({
          ...user,
          isLoggedIn: true,
          accessToken: token,
        });
      },

      logout: async () => {
        const { accessToken } = useAuthStore.getState();
        Storage.removeItem(TOKEN.ACCESS);
        set({
          name: '',
          authority: 'USER',
          isLoggedIn: false,
          accessToken: null,
        });
        try {
          await logoutApi(accessToken);
        } catch (error) {}
      },

      updateAccessToken: (token) => {
        Storage.setItem(TOKEN.ACCESS, token);
        set({
          accessToken: token,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
