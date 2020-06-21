import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LoginCredentials, RegisterCredentials } from '../models/credentials.interface';

import { User } from '../../../shared/users/schemas/user.schema';
import { UsersService } from '../../../shared/users/services/users.service';

// schemas
import { ConsentRegistry } from '../schemas/consent-registry.schema';
import { EmailVerification } from '../schemas/email-verification.schema';
import { ForgottenPassword } from '../schemas/forgotten-password.schema';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService,
              @InjectModel(ConsentRegistry.name)
              private readonly consentRegistryModel: Model<ConsentRegistry>,
              @InjectModel(EmailVerification.name)
              private readonly emailVerificationModel: Model<EmailVerification>,
              @InjectModel(ForgottenPassword.name)
              private readonly forgottenPasswordModel: Model<ForgottenPassword>,
  ) {
  }

  public async register(userInformation: RegisterCredentials): Promise<User> {
    const user = await this.usersService.addOne(userInformation);

    const userConsent = await this.saveUserConsent(user.email);
    const createVerificationToken = await this.createEmailVerificationToken(user.email);

    return null;
  }

  public async saveUserConsent(email: string): Promise<ConsentRegistry> {

    return null;
  }

  private async createEmailVerificationToken(email: string): Promise<EmailVerification> {
    return null;
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
