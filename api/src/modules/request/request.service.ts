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

  async getRequestById(requestId: Types.ObjectId) {
    return await this.requestModel.findById(requestId);
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
