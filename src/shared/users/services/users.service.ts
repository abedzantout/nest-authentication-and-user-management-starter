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

  public async getByEmail(email:string):Promise<User> {
    return await this.userModel.findOne({email}).exec()
  }

  public async addOne(user: UserInterface): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return await this.userModel.create({ ...user, password: hashedPassword });
  }

  public async updateOne(user: UserInterface): Promise<any> {
    return await this.userModel.findOneAndUpdate({ id: user.id }, user).exec();
  }

  public async findByIdAndDelete(id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(id).exec();
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
