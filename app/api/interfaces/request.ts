import { RequestStatus, RequestType } from '@jonzubi/securscan-shared';

export type IGetRequest = {
  _id: string;
  userId: string;
  requestType: RequestType;
  ipToScan: string;
  status: RequestStatus;
  __v: number;
  requestResolve: IResolve[];
  createdAt: Date;
};

export type IResolve = {
  _id: string;
  requestId: string;
  resolveDNS: string;
  scanIP: IScanIp;
  __v: number;
};

export type IScanIp = {
  ports: number[];
  vulns: number[];
  domains: string[];
  hostnames: string[];
  isp: string;
};
