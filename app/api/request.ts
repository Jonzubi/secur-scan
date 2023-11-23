import { getHeaderWithAccessToken } from '../utils/functions';
import axios from './axios';
import { ICreateRequest } from '@jonzubi/securscan-shared';
import { IGetRequest } from './interfaces/request';

export const getRequests = (token: string) =>
  axios.get<IGetRequest[]>(
    `${process.env.EXPO_PUBLIC_API_URL}/request`,
    getHeaderWithAccessToken(token),
  );

export const createRequest = (token: string, body: ICreateRequest) =>
  axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/request`,
    body,
    getHeaderWithAccessToken(token),
  );
