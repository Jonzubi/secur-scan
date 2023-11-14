import { Injectable } from '@nestjs/common';
import * as dns from 'dns';
import { RequestDocument } from '../schema/request.schema';
import { RequestType } from '@jonzubi/securscan-shared';

@Injectable()
export class RequestResolveService {
  // A dictionary relating the requestType and the resolve function
  private resolveFunctions: Record<
    RequestType,
    (request: RequestDocument) => Promise<string>
  > = {
    RESOLVE_DNS: this.resolveDNS,
    SCAN_IP: this.scanIP,
    DETAILED_SCAN: this.detailedScan,
    MITIGATION_ADVICES: this.mitigationAdvices,
  };

  async resolveDNS(request: RequestDocument): Promise<string> {
    return new Promise((resolve, reject) => {
      dns.lookup(request.ipToScan, (err, address) => {
        if (err) {
          reject(err);
        } else {
          resolve(address);
        }
      });
    });
  }

  async scanIP(request: RequestDocument): Promise<string> {
    return '';
  }

  async detailedScan(request: RequestDocument): Promise<string> {
    return '';
  }

  async mitigationAdvices(request: RequestDocument): Promise<string> {
    return '';
  }

  async resolveQueueRequest(request: RequestDocument) {
    const resolveFunction = this.resolveFunctions[request.requestType];
    return await resolveFunction(request);
  }
}
