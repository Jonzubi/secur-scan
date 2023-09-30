import { create } from 'zustand';

export interface UserStore {
  email: string;
  username: string;
  access_token: string;
  setUserData: (userData: UserState) => void;
  resetUserData: () => void;
}
export interface UserState {
  email: string;
  username: string;
  access_token: string;
}

export const useUserStore = create<UserStore>((set) => ({
  email: '',
  username: '',
  access_token: '',
  setUserData: (userData: UserState) => set(userData),
  resetUserData: () =>
    set({
      email: '',
      username: '',
      access_token: '',
    }),
}));
