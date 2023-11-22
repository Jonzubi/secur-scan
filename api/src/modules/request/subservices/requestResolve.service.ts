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

@Injectable()
export class RequestResolveService {
  constructor(
    @InjectModel(RequestResolve.name)
    private requestResolveModel: Model<RequestResolve>,
    @InjectModel(Request.name)
    private requestModel: Model<RequestDocument>,
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

  async scanIP(request: RequestDocument): Promise<RequestResolveDocument> {
    const scanIp = new this.requestResolveModel({
      requestId: request._id,
      scanIP: '',
    });
    return scanIp;
  }

  async detailedScan(
    request: RequestDocument,
  ): Promise<RequestResolveDocument> {
    const detailedScan = new this.requestResolveModel({
      requestId: request._id,
      detailedScan: '',
    });
    return detailedScan;
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
      await this.requestModel.updateOne(
        { _id: request._id },
        { status: RequestStatus.SUCCESS },
      );
      return resolve;
    } catch (error) {
      await this.createErroredRequestResolve(
        request,
        JSON.stringify(error.message),
      );
      await this.requestModel.updateOne(
        { _id: request._id },
        { status: RequestStatus.ERROR },
      );
    }
  }
}
