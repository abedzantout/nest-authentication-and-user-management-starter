import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserInterface } from '../models/user.model';

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
}
