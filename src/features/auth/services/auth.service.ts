import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginCredentials, RegisterCredentials } from '../models/credentials.interface';

import { User } from '../../../shared/users/schemas/user.schema';
import { UsersService } from '../../../shared/users/services/users.service';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {
  }

  public async register(userInformation: RegisterCredentials): Promise<User> {
    return await this.usersService.addOne(userInformation);
  }

  public async login(credentials: LoginCredentials): Promise<User | any> {
    const user: User | any = await this.usersService.findUserAndPasswordById(credentials.email, credentials.password);
    const access_token = await this.createToken(user.email, user.id);
    return { user, access_token };
  }

  public async sendEmailForgotPassword(email: string) {
    const user = this.usersService.findByEmail(email);

  }

  public async sendEmailVerification(email: string) {
  }

  public async resetPassword(email: string) {
  }

  private async createToken(email: string, id: string) {
    const payload = { email, sub: id };
    return this.jwtService.sign(payload);
  }

  async validateUser(signedUser: LoginCredentials): Promise<User> {
    const user = await this.usersService.findByEmail(signedUser.email);
    return user || null;
  }
}
