import { Injectable } from '@nestjs/common';
import { Request, RequestDocument } from '../schema/request.schema';
import { RequestStatus, RequestType } from '@jonzubi/securscan-shared';
import {
  RequestResolve,
  RequestResolveDocument,
} from '../schema/requestResolve.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { domainToIP } from 'src/utils/functions/dns';
import { EventsGateway } from 'src/modules/socket/events.gateway';
import { ShodanService } from './shodan.service';
import { RequestService } from '../request.service';

@Injectable()
export class RequestResolveService {
  constructor(
    @InjectModel(RequestResolve.name)
    private requestResolveModel: Model<RequestResolve>,
    @InjectModel(Request.name)
    private requestModel: Model<RequestDocument>,
    private eventsGateway: EventsGateway,
    private readonly shodanService: ShodanService,
    private readonly requestService: RequestService,
  ) {}

  // A dictionary relating the requestType and the resolve function
  private resolveFunctions: Record<
    RequestType,
    (request: RequestDocument) => Promise<RequestResolveDocument>
  > = {
    RESOLVE_DNS: this.resolveDNS,
    SCAN_IP: this.scanIP,
    DETAILED_SCAN: this.detailedScan,
    MITIGATION_ADVICES: this.mitigationAdvices,
  };

  async resolveDNS(request: RequestDocument): Promise<RequestResolveDocument> {
    const ip = await domainToIP(request.ipToScan);
    const resolve = new this.requestResolveModel({
      requestId: request._id,
      resolveDNS: ip,
    });
    return await resolve.save();
  }

  async scanIP({
    ipToScan,
    _id,
  }: RequestDocument): Promise<RequestResolveDocument> {
    const scanIpMinifiedData =
      await this.shodanService.scanIpMinified(ipToScan);
    const scanIp = new this.requestResolveModel({
      requestId: _id,
      scanIP: scanIpMinifiedData,
    });
    return await scanIp.save();
  }

  async detailedScan({
    ipToScan,
    _id,
  }: RequestDocument): Promise<RequestResolveDocument> {
    const detailedScanIp = await this.shodanService.detailedScanIp(ipToScan);
    const scanIp = new this.requestResolveModel({
      requestId: _id,
      detailedScan: detailedScanIp,
    });
    return await scanIp.save();
  }

  async mitigationAdvices(
    request: RequestDocument,
  ): Promise<RequestResolveDocument> {
    const mitigationAdvices = new this.requestResolveModel({
      requestId: request._id,
      mitigationAdvices: '',
    });
    return mitigationAdvices;
  }

  async createErroredRequestResolve(
    request: RequestDocument,
    errorInfo: string,
  ): Promise<RequestResolveDocument> {
    const errorRequestResolve = new this.requestResolveModel({
      requestId: request._id,
      errorInfo,
    });
    return await errorRequestResolve.save();
  }

  async resolveQueueRequest(
    request: RequestDocument,
  ): Promise<RequestResolveDocument> {
    const resolveFunction = this.resolveFunctions[request.requestType];
    try {
      const resolve = await resolveFunction.bind(this)(request);
      await this.requestService.updateRequestStatus(
        request._id,
        RequestStatus.SUCCESS,
      );
      return resolve;
    } catch (error) {
      await this.createErroredRequestResolve(
        request,
        JSON.stringify(error, null, 2),
      );
      await this.requestService.updateRequestStatus(
        request._id,
        RequestStatus.ERROR,
      );
    } finally {
      this.eventsGateway.emitRequestStatusChange(request.userId);
    }
  }
}
