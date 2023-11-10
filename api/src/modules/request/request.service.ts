import { ICreateRequest } from '@jonzubi/securscan-shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Request, RequestDocument } from './schema/request.schema';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
  ) {}
  async createRequest(
    request: ICreateRequest,
    userId: Types.ObjectId,
  ): Promise<RequestDocument> {
    const modelRequest = new this.requestModel({
      ...request,
      userId,
    });
    return await modelRequest.save();
  }
  async getRequestById(requestId: Types.ObjectId) {
    return await this.requestModel.findById(requestId);
  }
}
