import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { ICreateUser } from '@jonzubi/securscan-shared/dist';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: ICreateUser) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
