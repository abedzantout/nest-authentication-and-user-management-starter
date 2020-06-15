import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginCredentials, RegisterCredentials } from '../models/login.model';
import { UserInterface } from '../../../shared/users/models/user.model';

import { User } from '../../../shared/users/schemas/user.entity';
import { UsersService } from '../../../shared/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {
  }

  async register(userInformation: RegisterCredentials): Promise<User> {
    const user: UserInterface = { ...userInformation, password: bcrypt.hash(userInformation.password, 10) };

    return await this.usersService.addOne(user);
  }

  async login(credentials: LoginCredentials) {

    return await this.usersService.findUserAndPasswordById(credentials.email, credentials.password);

  }
}
