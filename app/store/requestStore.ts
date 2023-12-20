import { RequestStatus, RequestType } from '@jonzubi/securscan-shared';
import { create } from 'zustand';

type RequestStore = RequestStates & RequestStateMethods;

type RequestStateMethods = {
  setRequests: (requests: RequestState[]) => void;
  resetRequests: () => void;
};

type RequestStates = {
  requests: RequestState[];
};

export interface RequestState {
  id: string;
  type: RequestType;
  ipToScan: string;
  status: RequestStatus;
  createdAt: Date;
}

export const useRequestStore = create<RequestStore>((set) => ({
  requests: [],
  setRequests: (requests: RequestState[]) => set({ requests }),
  resetRequests: () => set({ requests: [] }),
}));
