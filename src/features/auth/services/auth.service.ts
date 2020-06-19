import { Injectable } from '@nestjs/common';

import { LoginCredentials, RegisterCredentials } from '../models/credentials.interface';

import { User } from '../../../shared/users/schemas/user.schema';
import { UsersService } from '../../../shared/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {
  }

  public async register(userInformation: RegisterCredentials): Promise<User> {
    return await this.usersService.addOne(userInformation);
  }

  public async login(credentials: LoginCredentials): Promise<User | any> {
    const user = await this.usersService.findUserAndPasswordById(credentials.email, credentials.password);

    return user;
  }

  public async sendEmailForgotPassword(email: string) {
    const user = this.usersService.findByEmail(email);

  }

  public async sendEmailVerification(email: string) {
  }

  public async resetPassword(email: string) {
  }
}
