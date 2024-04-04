import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShodanDetailedScanIpDocument =
  HydratedDocument<ShodanDetailedScanIp>;

@Schema()
export class ShodanDetailedScanIp {
  @Prop({ type: [Number] })
  ports: number[];
  @Prop({ type: Number })
  vulns: number;
  @Prop({ type: [String] })
  domains: string[];
  @Prop({ type: [String] })
  hostnames: string[];
  @Prop({ type: String })
  isp: string;

  @Prop({
    type: [
      {
        cve: String,
        port: Number,
        description: String,
      },
    ],
  })
  vulnsDetails: {
    cve: string;
    port: number;
    description: string;
  }[];
}

export const ShodanDetailedScanIpSchema =
  SchemaFactory.createForClass(ShodanDetailedScanIp);
