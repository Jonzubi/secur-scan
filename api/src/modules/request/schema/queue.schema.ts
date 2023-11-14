import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Tier } from '@jonzubi/securscan-shared';
import { RequestDocument } from './request.schema';

export type QueueDocument = HydratedDocument<Queue>;
export interface PopulatedQueueDocument
  extends Omit<QueueDocument, 'requestId'> {
  requestId: RequestDocument;
}

@Schema()
export class Queue extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Request' })
  requestId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  reqTimeSpan: Date;

  @Prop({ type: String, enum: Tier, required: true })
  tier: Tier;

  @Prop({ type: Number, enum: [0, 1], required: true })
  priority: number;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
