import { RequestType } from '@jonzubi/securscan-shared';

export const REQUEST_TO_HREF: Record<RequestType, string> = {
  RESOLVE_DNS: '/resolve-dns',
  SCAN_IP: '/scan-ip',
  DETAILED_SCAN: '/detailed-scan',
  MITIGATION_ADVICES: '/mitigation-advices',
};
