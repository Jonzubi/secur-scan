import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Tier } from '@jonzubi/securscan-shared';
import {
  DEFAULT_INITIAL_TIER,
  DEFAULT_INITIAL_TOKENS,
} from 'src/utils/constants/user';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  creationDate: Date;

  @Prop({ default: false })
  loginByGoogle: boolean;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  emailVerificationToken?: string;

  @Prop({ default: DEFAULT_INITIAL_TOKENS })
  tokens: number;

  @Prop({ default: DEFAULT_INITIAL_TIER, enum: Tier })
  tier: Tier;
}

export const UserSchema = SchemaFactory.createForClass(User);
