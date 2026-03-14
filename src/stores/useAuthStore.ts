import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/user/client';
import { logoutApi } from '@/api/auth/auth';
import { Storage } from '@/api/storage/storage';
import { TOKEN } from '@/constants/common/constants';

interface AuthState extends User {
  isLoggedIn: boolean;
  isInitialized: boolean;
  isLogoutRedirecting: boolean;
  accessToken: string | null;
  login: (user: User, token: string) => void;
  logout: () => Promise<void>;
  updateAccessToken: (token: string) => void;
  setLogoutRedirecting: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: '',
      authority: 'USER',
      isLoggedIn: false,
      isInitialized: false,
      isLogoutRedirecting: false,
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
        try {
          await logoutApi(accessToken);
        } finally {
          Storage.removeItem(TOKEN.ACCESS);
          set({
            email: '',
            authority: 'USER',
            isLoggedIn: false,
            accessToken: null,
          });
        }
      },

      updateAccessToken: (token) => {
        Storage.setItem(TOKEN.ACCESS, token);
        set({ accessToken: token });
      },

      setLogoutRedirecting: (value) => {
        set({ isLogoutRedirecting: value });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        email: state.email,
        authority: state.authority,
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.isInitialized = true;
      },
    }
  )
);
