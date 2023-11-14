import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RequestResolveDocument = HydratedDocument<RequestResolve>;

@Schema()
export class RequestResolve {
  @Prop({ type: Types.ObjectId, ref: 'Request', required: true })
  requestId: Types.ObjectId;

  @Prop({ type: String, required: true })
  result: string;
}

export const RequestResolveSchema =
  SchemaFactory.createForClass(RequestResolve);
