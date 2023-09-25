import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Tier } from '../../../../../shared/interfaces/user/tier';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop()
  creationDate: Date;

  @Prop({ default: false })
  loginByGoogle: boolean;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  emailVerificationToken?: string;

  @Prop({ default: 0 })
  tokens: number;

  @Prop({ default: Tier.FREE, enum: Tier })
  tier: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
