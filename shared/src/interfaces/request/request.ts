export interface CreateRequest {
  requestType: string;
  iptoscan: string;
  requestToScan: string;
}

export enum RequestType {
  RESOLVE_DNS = 'RESOLVE_DNS',
  SCAN_IP = 'SCAN_IP',
  DETAILED_SCAN = 'DETAILED_SCAN',
  MITIGATION_ADVICES = 'MITIGATION_ADVICES',
}