import { RequestStatus, RequestType } from '@jonzubi/securscan-shared';

export type IGetRequest = {
  _id: string;
  userId: string;
  requestType: RequestType;
  ipToScan: string;
  status: RequestStatus;
  __v: number;
  requestResolve: IResolve[];
};

export type IResolve = {
  _id: string;
  requestId: string;
  resolveDNS: string;
  __v: number;
};
