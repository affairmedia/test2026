import { create } from 'zustand';

interface AppState {
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
  setUser: (user: AppState['user']) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    name: 'John Doe',
    email: 'john.doe@smartstock.com',
    role: 'Admin',
  },
  setUser: (user) => set({ user }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
