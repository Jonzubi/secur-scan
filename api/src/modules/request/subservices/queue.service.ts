import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PopulatedQueueDocument,
  Queue,
  QueueDocument,
} from '../schema/queue.schema';
import { Model, Types } from 'mongoose';
import { RequestStatus, Tier } from '@jonzubi/securscan-shared';
import { Cron } from '@nestjs/schedule';
import { RequestDocument } from '../schema/request.schema';
import { RequestResolveService } from './requestResolve.service';
import { FREE_QUEUE_INTERVAL } from 'src/utils/constants/queue';
import { RequestService } from '../request.service';
import { EventsGateway } from 'src/modules/socket/events.gateway';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel(Queue.name) private queueModel: Model<QueueDocument>,
    private readonly requestResolveService: RequestResolveService,
    private readonly requestService: RequestService,
    private eventsGateway: EventsGateway,
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

  @Cron(FREE_QUEUE_INTERVAL)
  async handleFreeQueue() {
    const queue = await this.getNextRequestByTier(Tier.FREE);
    if (!queue) return;

    await this.requestService.updateRequestStatus(
      queue._id,
      RequestStatus.WORKING,
    );
    this.eventsGateway.emitRequestStatusChange(queue.requestId.userId);
    await this.requestResolveService.resolveQueueRequest(queue.requestId);
    await this.queueModel.deleteOne({ _id: queue._id });
  }

  async getNextRequestByTier(tier: Tier): Promise<PopulatedQueueDocument> {
    return await this.queueModel
      .findOne({ tier })
      .sort({ priority: 1, reqTimeSpan: 1 })
      .populate<{ requestId: RequestDocument }>('requestId')
      .exec();
  }
}
