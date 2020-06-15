import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { User } from '../schemas/user.schema';

import { UserInterface } from '../models/user.model';


@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name)
              private readonly userModel: Model<User>) {
  }

  public async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  public async getById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  public async addOne(user: UserInterface): Promise<User> {

    return await this.userModel.create(user);
  }

  public async updateOne(user: UserInterface): Promise<any> {
    return await this.userModel.findOneAndUpdate({ id: user.id }, user).exec();
  }

  public async deleteOne(id: string): Promise<any> {
    return await this.userModel.findOneAndDelete({ id }).exec();
  }

  public async findUserAndPasswordById(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      return user;
    }

    throw new HttpException(
      {
        message: 'Wrong email/password combination',
        status: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );

  }
}
