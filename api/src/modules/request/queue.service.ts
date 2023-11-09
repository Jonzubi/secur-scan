import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue, QueueDocument } from './schema/queue.schema';
import { Model, Types } from 'mongoose';
import { Tier } from '@jonzubi/securscan-shared';

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
}
