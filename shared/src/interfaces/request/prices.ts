import { RequestType } from "./request";

export const REQUEST_PRICES: Record<RequestType, number> = {
  [RequestType.RESOLVE_DNS]: 5,
  [RequestType.SCAN_IP]: 20,
  [RequestType.DETAILED_SCAN]: 50,
  [RequestType.MITIGATION_ADVICES]: 100,
};