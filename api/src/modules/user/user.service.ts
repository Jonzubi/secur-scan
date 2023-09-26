import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { ICreateUser, IUser, Tier } from '@jonzubi/securscan-shared/dist';
import { hashPassword } from 'src/utils/functions/bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    userData: ICreateUser,
    loginByGoogle: boolean = false,
  ): Promise<IUser> {
    const user: IUser = {
      email: userData.email,
      password: hashPassword(userData.password),
      creationDate: new Date(),
      emailVerified: false,
      loginByGoogle,
      tier: Tier.FREE,
      tokens: 0,
      username: userData.username,
      emailVerificationToken: Math.random().toString(36).slice(2),
    };

    const modelUser = new this.userModel(user);
    await modelUser.save();

    return user;
  }
}
