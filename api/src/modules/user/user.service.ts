import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { ICreateUser, IUser, Tier } from '@jonzubi/securscan-shared';
import { hashPassword } from 'src/utils/functions/bcrypt';
import { DEFAULT_INITIAL_TOKENS } from 'src/utils/constants/user';

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
      tokens: DEFAULT_INITIAL_TOKENS,
      emailVerificationToken: Math.random().toString(36).slice(2),
    };

    const modelUser = new this.userModel(user);
    await modelUser.save();

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const foundUser = await this.userModel.findOne({
      email,
    });
    return foundUser;
  }

  async subtractToken(userId: Types.ObjectId, amount: number) {
    await this.userModel.updateOne(
      { _id: userId },
      { $inc: { tokens: -amount } },
    );
  }

  async addToken(userId: Types.ObjectId, amount: number) {
    await this.userModel.updateOne(
      { _id: userId },
      { $inc: { tokens: amount } },
    );
  }
}
