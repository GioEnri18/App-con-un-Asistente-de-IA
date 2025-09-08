import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface User {
  id: number;
  name?: string;
  email: string;
  roles: string[];
}

export interface Permission {
  action: string;
  subject: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  permissions: Permission[];
  login: (user: User, token: string, permissions: Permission[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
  permissions: [],
  login: (user: User, token: string, permissions: Permission[]) => set({ user, token, permissions }),
      logout: () => set({ user: null, token: null, permissions: [] }),
    }),
    { name: 'auth-store' }
  )
);
