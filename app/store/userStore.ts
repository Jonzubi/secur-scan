import { create } from 'zustand';

export interface UserStore {
  email: string;
  access_token: string;
  setUserData: (userData: UserState) => void;
  setUserEmail: (email: string) => void;
  resetUserData: () => void;
}
export interface UserState {
  email: string;
  access_token: string;
}

export const useUserStore = create<UserStore>((set) => ({
  email: '',
  access_token: '',
  setUserData: (userData: UserState) => set(userData),
  setUserEmail: (email: string) => set({ email }),
  resetUserData: () =>
    set({
      email: '',
      access_token: '',
    }),
}));
