import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

// Mock users for demo
const MOCK_USERS = [
  { id: '1', username: 'admin', password: 'admin', role: 'admin', name: 'Admin User', email: 'admin@taskease.com' },
  { id: '2', username: 'user', password: 'user', role: 'teacher', name: 'Teacher User', email: 'teacher@taskease.com' },
  { id: '3', username: 'role', password: 'role', role: 'staff', name: 'Staff User', email: 'staff@taskease.com' },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        const user = MOCK_USERS.find(
          (u) => u.username === username && u.password === password
        );
        
        if (!user) {
          throw new Error('Invalid credentials');
        }
        
        const { password: _, ...userWithoutPassword } = user;
        set({ user: userWithoutPassword as User, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);