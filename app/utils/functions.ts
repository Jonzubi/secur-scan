import { AxiosRequestConfig } from 'axios';

export const performTimeConsumingTask = async () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve('result');
    }, 2000),
  );

export const getHeaderWithAccessToken = (
  accessToken: string,
): AxiosRequestConfig => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
