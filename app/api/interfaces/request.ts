export type IGetRequest = {
  _id: string;
  userId: string;
  requestType: string;
  ipToScan: string;
  __v: number;
  requestResolve: IResolve[];
};

export type IResolve = {
  _id: string;
  requestId: string;
  resolveDNS: string;
  __v: number;
};
