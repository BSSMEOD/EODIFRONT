import { create } from 'zustand';

export type UserAuthority = 'MANAGER' | 'TEACHER' | 'STUDENT';

interface UserState {
  name: string;
  authority: UserAuthority;
  isLoggedIn: boolean;
  setUser: (name: string, authority: UserAuthority) => void;
  login: (name: string, authority: UserAuthority) => void;
  logout: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  authority: 'STUDENT',
  isLoggedIn: false,
  setUser: (name, authority) => set({ name, authority }),
  login: (name, authority) => set({ name, authority, isLoggedIn: true }),
  logout: () => set({ name: '', authority: 'STUDENT', isLoggedIn: false }),
  clearUser: () => set({ name: '', authority: 'STUDENT', isLoggedIn: false }),
}));
