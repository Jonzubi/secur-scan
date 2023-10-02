import { getHeaderWithAccessToken } from '../utils/functions';
import axios from './axios';

export const getProfile = (token: string) =>
  axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/profile`,
    getHeaderWithAccessToken(token),
  );
