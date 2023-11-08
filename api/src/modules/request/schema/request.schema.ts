import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema()
export class Request {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  requestType: string;

  @Prop()
  iptoscan: string;

  @Prop()
  requestToScan: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
