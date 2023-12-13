export interface IShodanScanIpMinified {
  ports: number[];
  vulns: string[];
  domains: string[];
  hostnames: string[];
  isp: string;
}

export interface IShodanScanIpMinifiedForDocument {
  ports: number[];
  vulns: number;
  domains: string[];
  hostnames: string[];
  isp: string;
}
