import { Tier } from '@jonzubi/securscan-shared';
import { create } from 'zustand';

export type UserStore = UserState & UserStateMethods;

type UserStateMethods = {
  setUserData: (userData: UserState) => void;
  setUserEmail: (email: string) => void;
  resetUserData: () => void;
};
export interface UserState {
  email: string;
  access_token: string;
  tokens: number;
  tier: Tier;
}

export const useUserStore = create<UserStore>((set) => ({
  email: '',
  access_token: '',
  tier: Tier.FREE,
  tokens: 0,
  setUserData: (userData: UserState) => set(userData),
  setUserEmail: (email: string) => set({ email }),
  resetUserData: () =>
    set({
      email: '',
      access_token: '',
    }),
}));
