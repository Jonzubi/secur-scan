import { RequestStatus, RequestType } from '@jonzubi/securscan-shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RequestDocument = HydratedDocument<Request>;

@Schema()
export class Request {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: RequestType, required: true })
  requestType: string;

  @Prop()
  ipToScan: string;

  @Prop()
  requestToScan: string;

  @Prop({ type: String, enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
