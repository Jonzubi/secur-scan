import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Request } from './request.schema';
import { Tier } from '@jonzubi/securscan-shared';

@Schema()
export class Queue extends Document {
  @Prop({ type: Request, required: true })
  requestId: Request;

  @Prop({ type: Date, required: true })
  reqTimeSpan: Date;

  @Prop({ type: String, enum: Tier, required: true })
  tier: Tier;

  @Prop({ type: Number, enum: [0, 1], required: true })
  priority: number;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
