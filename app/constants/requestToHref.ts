import { RequestType } from '@jonzubi/securscan-shared';

export const REQUEST_TO_HREF: Record<RequestType, string> = {
  RESOLVE_DNS: '/home/resolve-dns',
  SCAN_IP: '/home/scan-ip',
  DETAILED_SCAN: '/home/detailed-scan',
  MITIGATION_ADVICES: '/home/mitigation-advices',
};
