import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShodanScanIpMinifiedDocument =
  HydratedDocument<ShodanScanIpMinified>;

@Schema()
export class ShodanScanIpMinified {
  @Prop({ type: [Number] })
  ports: number[];
  @Prop({ type: [String] })
  vulns: string[];
  @Prop({ type: [String] })
  domains: string[];
  @Prop({ type: [String] })
  hostnames: string[];
  @Prop({ type: String })
  isp: string;
}

export const ShodanScanIpMinifiedSchema =
  SchemaFactory.createForClass(ShodanScanIpMinified);
