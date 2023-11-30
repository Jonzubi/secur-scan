import { RequestType } from '@jonzubi/securscan-shared';

export const REQUEST_TO_HREF: Record<RequestType, string> = {
  RESOLVE_DNS: '/modals/resolve-dns',
  SCAN_IP: '/modals/scan-ip',
  DETAILED_SCAN: '/modals/detailed-scan',
  MITIGATION_ADVICES: '/modals/mitigation-advices',
};
