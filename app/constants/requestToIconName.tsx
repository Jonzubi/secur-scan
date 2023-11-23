import { RequestType } from '@jonzubi/securscan-shared';

export const REQUEST_TO_ICON_NAME = {
  [RequestType.RESOLVE_DNS]: 'web',
  [RequestType.SCAN_IP]: 'ip-network-outline',
  [RequestType.DETAILED_SCAN]: 'information-outline',
  [RequestType.MITIGATION_ADVICES]: 'shield-check-outline',
};
