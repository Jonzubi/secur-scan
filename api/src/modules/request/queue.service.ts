import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PopulatedQueueDocument,
  Queue,
  QueueDocument,
} from './schema/queue.schema';
import { Model, Types } from 'mongoose';
import { Tier } from '@jonzubi/securscan-shared';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RequestDocument } from './schema/request.schema';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel(Queue.name) private queueModel: Model<QueueDocument>,
  ) {}

  async addToQueue({
    requestId,
    tier,
  }: {
    requestId: Types.ObjectId;
    tier: Tier;
  }): Promise<QueueDocument> {
    let auxPriority = 0;
    if (tier !== Tier.FREE) {
      auxPriority = Tier.PREMIUM === tier ? 0 : 1;
    }
    const queue = new this.queueModel({
      requestId,
      tier,
      priority: auxPriority,
      reqTimeSpan: new Date(),
    });

    return await queue.save();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleFreeQueue() {
    const queue = await this.getNextRequestByTier(Tier.FREE);
  }

  async getNextRequestByTier(tier: Tier): Promise<PopulatedQueueDocument> {
    return await this.queueModel
      .findOne({ tier })
      .sort({ priority: 1, reqTimeSpan: 1 })
      .populate<{ requestId: RequestDocument }>('requestId')
      .exec();
  }
}
