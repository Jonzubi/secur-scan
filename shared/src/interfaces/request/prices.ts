import { RequestType } from "./request";

export const REQUEST_PRICES: Record<RequestType, number> = {
  [RequestType.RESOLVE_DNS]: 1,
  [RequestType.SCAN_IP]: 2,
  [RequestType.DETAILED_SCAN]: 3,
  [RequestType.MITIGATION_ADVICES]: 4,
};