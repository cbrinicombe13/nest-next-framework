import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async findOne(username: string): Promise<UserDocument | undefined> {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }

  async create(user: User): Promise<UserDocument> {
    const model = new this.userModel({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
    return await model.save();
  }
}
