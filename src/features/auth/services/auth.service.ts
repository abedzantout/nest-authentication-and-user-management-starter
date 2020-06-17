import { Injectable } from '@nestjs/common';

import { LoginCredentials, RegisterCredentials } from '../models/login.model';

import { User } from '../../../shared/users/schemas/user.schema';
import { UsersService } from '../../../shared/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {
  }

  async register(userInformation: RegisterCredentials): Promise<User> {
    return await this.usersService.addOne(userInformation);
  }

  async login(credentials: LoginCredentials) {
    return await this.usersService.findUserAndPasswordById(credentials.email, credentials.password);
  }
}
