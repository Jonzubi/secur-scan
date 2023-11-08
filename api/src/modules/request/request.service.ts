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
  async createRequest(request: ICreateRequest, userId: Types.ObjectId) {
    const modelRequest = new this.requestModel({
      ...request,
      userId,
    });
    await modelRequest.save();
  }
  async getRequests() {}
}
