import { create } from 'zustand';
import { User } from '@/types/user/client';

interface AuthState extends User {
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  name: '',
  authority: 'TEACHER',
  isLoggedIn: true,
  login: (user) => set({ ...user, isLoggedIn: true }),
  logout: () => set({ name: '', authority: 'STUDENT', isLoggedIn: false }),
}));
