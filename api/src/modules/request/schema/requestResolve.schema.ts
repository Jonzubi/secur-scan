import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  ShodanScanIpMinifiedDocument,
  ShodanScanIpMinifiedSchema,
} from './shodanScanIpMinified.schema';

export type RequestResolveDocument = HydratedDocument<RequestResolve>;

@Schema()
export class RequestResolve {
  @Prop({ type: Types.ObjectId, ref: 'Request', required: true })
  requestId: Types.ObjectId;

  @Prop({ type: String })
  resolveDNS: string;

  @Prop({ type: ShodanScanIpMinifiedSchema })
  scanIP: ShodanScanIpMinifiedDocument;

  @Prop({ type: String })
  detailedScan: string;

  @Prop({ type: String })
  mitigationAdvices: string;

  @Prop({ type: String })
  errorInfo: string;
}

export const RequestResolveSchema =
  SchemaFactory.createForClass(RequestResolve);
