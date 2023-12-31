import {
  ICreateUser,
  ISignIn,
  IGetProfile,
  IResSignIn,
} from '@jonzubi/securscan-shared';
import { getHeaderWithAccessToken } from '../utils/functions';
import axios from './axios';

export const getProfile = (token: string) =>
  axios.get<IGetProfile>(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/profile`,
    getHeaderWithAccessToken(token),
  );

export const login = (user: ISignIn) =>
  axios.post<IResSignIn>(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, user);

export const createUser = (user: ICreateUser) =>
  axios.post(`${process.env.EXPO_PUBLIC_API_URL}/user`, user);
