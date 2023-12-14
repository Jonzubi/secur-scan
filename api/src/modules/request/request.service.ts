import { ICreateRequest, RequestStatus } from '@jonzubi/securscan-shared';
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

  async getRequestById({
    requestId,
    userId,
  }: {
    requestId: Types.ObjectId;
    userId: Types.ObjectId;
  }): Promise<RequestDocument> {
    const result = await this.requestModel.aggregate([
      { $match: { _id: requestId, userId: userId } },
      {
        $lookup: {
          from: 'requestresolves',
          localField: '_id',
          foreignField: 'requestId',
          as: 'requestResolve',
        },
      },
    ]);
    return result[0];
  }

  async getRequests(userId: Types.ObjectId): Promise<RequestDocument[]> {
    return await this.requestModel.aggregate([
      { $match: { userId: userId } },
      {
        $lookup: {
          from: 'requestresolves',
          localField: '_id',
          foreignField: 'requestId',
          as: 'requestResolve',
        },
      },
    ]);
  }

  async updateRequestStatus(requestId: Types.ObjectId, status: RequestStatus) {
    return await this.requestModel.updateOne(
      { _id: requestId },
      { status: status },
    );
  }
}
