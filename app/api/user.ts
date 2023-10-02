import { getHeaderWithAccessToken } from '../utils/functions';

export const getProfile = (token: string) =>
  fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/profile`,
    getHeaderWithAccessToken(token),
  );
