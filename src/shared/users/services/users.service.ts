import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { User } from '../schemas/user.schema';

import { UserInterface } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  public async getById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  public async addOne(user: UserInterface): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.userModel.create({ ...user, password: hashedPassword });
  }

  public async updateOne(user: UserInterface): Promise<any> {
    return await this.userModel
      .findOneAndUpdate({ _id: user.id }, user, { new: true })
      .exec();
  }

  public async updateOnePassword(
    email: string,
    new_password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(new_password, 10);
    return await this.userModel
      .findOneAndUpdate({ email }, { password: hashedPassword }, { new: true })
      .exec();
  }

  public async findByIdAndDelete(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  public async findUserAndPasswordById(
    email: string,
    password: string,
  ): Promise<User | Error> {
    const user = await this.userModel.findOne({ email });
    const checkPassword = user
      ? await bcrypt.compare(password, user.password)
      : null;

    if (checkPassword) {
      return user;
    }

    throw Error('LOGIN.ERROR');
  }
}
