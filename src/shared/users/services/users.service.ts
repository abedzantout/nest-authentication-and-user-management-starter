import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../schemas/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserInterface } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
              private readonly usersRepository: MongoRepository<User>) {
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async addOne(user: UserInterface): Promise<User> {

    return await this.usersRepository.save(user);
  }

  async updateOne(user: UserInterface): Promise<any> {
    return await this.usersRepository.findOneAndUpdate({ id: user.id }, user);
  }

  async deleteOne(id: string): Promise<any> {
    return await this.usersRepository.findOneAndDelete({ id });
  }

  async findUserAndPasswordById(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
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
