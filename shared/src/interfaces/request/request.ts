export interface ICreateRequest {
  requestType: RequestType;
  ipToScan: string;
  requestToScan: string;
}

export enum RequestType {
  RESOLVE_DNS = "RESOLVE_DNS",
  SCAN_IP = "SCAN_IP",
  DETAILED_SCAN = "DETAILED_SCAN",
  MITIGATION_ADVICES = "MITIGATION_ADVICES",
}

export enum RequestStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  WORKING = "WORKING",
  ERROR = "ERROR",
}
