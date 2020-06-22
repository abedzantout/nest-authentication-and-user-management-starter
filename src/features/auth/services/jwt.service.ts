import { Injectable } from '@nestjs/common';
import { User } from '../../../shared/users/schemas/user.schema';
import { LoginCredentials } from '../models/credentials.interface';
import { UsersService } from '../../../shared/users/services/users.service';

/**
 * @deprecated
 */
@Injectable()
export class JwtService {
  constructor(private readonly usersService: UsersService) {
  }

  async validateUser(signedUser: LoginCredentials): Promise<User> {
    const user = await this.usersService.findByEmail(signedUser.email);
    return user || null;
  }
}
