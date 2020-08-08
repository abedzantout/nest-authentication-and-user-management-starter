import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';

import {
  LoginCredentials,
  RegisterCredentials,
} from '../models/credentials.interface';

// schemas
import { EmailVerification } from '../schemas/email-verification.schema';
import { ForgottenPassword } from '../schemas/forgotten-password.schema';
import { User } from '../../../shared/users/schemas/user.schema';

// services
import { InvitationService } from '../../../shared/invitation/services/invitation.service';
import { MailerService } from '../../../common/services/mailer/mailer.service';
import { UsersService } from '../../../shared/users/services/users.service';
import { ConsentRegistryService } from '../../../shared/auth/services/consent-registry.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly invitationService: InvitationService,
    private readonly mailerService: MailerService,
    private readonly consentRegistryService: ConsentRegistryService,
    @InjectModel(EmailVerification.name)
    private readonly emailVerificationModel: Model<EmailVerification>,
    @InjectModel(ForgottenPassword.name)
    private readonly forgottenPasswordModel: Model<ForgottenPassword>,
  ) {}

  public async register(
    userInformation: RegisterCredentials,
  ): Promise<EmailVerification> {
    const user = await this.usersService.addOne(userInformation);
    await this.consentRegistryService.saveUserConsent(user.email);
    return await this.createEmailVerificationToken(user.email);
  }

  public async registerByInvitation(
    invitation_token: string,
    userInfo: RegisterCredentials,
  ): Promise<User> {
    const invitation = await this.invitationService.findOne(
      userInfo.email,
      invitation_token,
    );
    const user = await this.usersService.findByEmail(userInfo.email);

    if (!invitation) throw Error('INVITATION.NOT_FOUND');
    if (user) throw Error('INVITATION.USER_ALREADY_EXISTS');

    await this.invitationService.deleteOne(invitation_token);

    return await this.usersService.addOne(userInfo);
  }

  public async createEmailVerificationToken(
    email: string,
  ): Promise<EmailVerification> {
    const emailVerification = await this.emailVerificationModel.findOne({
      email,
    });

    if (
      emailVerification &&
      (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 <
        15
    ) {
      throw new Error('LOGIN.EMAIL_SENT_RECENTLY');
    }

    return await this.emailVerificationModel
      .findOneAndUpdate(
        { email },
        {
          email,
          email_verification_token: uuidv4(),
          timestamp: new Date(),
        },
        { upsert: true, new: true },
      )
      .exec();
  }

  public async login(credentials: LoginCredentials): Promise<User | any> {
    const user: User | any = await this.usersService.findUserAndPasswordById(
      credentials.email,
      credentials.password,
    );

    if (!user) throw Error('LOGIN.USER_NOT_FOUND');
    if (!user.auth.email.valid) throw Error('LOGIN.EMAIL_NOT_VERIFIED');
    const access_token = await this.createToken(user.email, user.id);
    return { user: this.formatUser(user), access_token };
  }

  public async createForgottenPasswordToken(email: string) {
    const forgottenPassword = await this.forgottenPasswordModel.findOne({
      email,
    });

    if (
      forgottenPassword &&
      (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 <
        15
    ) {
      throw new Error('RESET_PASSWORD.EMAIL_SENT_RECENTLY');
    }
    const forgottenPasswordModel = await this.forgottenPasswordModel.findOneAndUpdate(
      { email: email },
      {
        email: email,
        new_password_token: uuidv4(), // (Math.floor(Math.random() * (9000000)) + 1000000).toString(), //Generate 7 digits number,
        timestamp: new Date(),
      },
      { upsert: true, new: true },
    );

    if (forgottenPasswordModel) {
      return forgottenPasswordModel;
    }

    throw new Error('LOGIN.ERROR.GENERIC_ERROR');
  }

  public async sendEmailForgotPassword(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new Error('LOGIN.USER_NOT_FOUND');

    const tokenModel = await this.createForgottenPasswordToken(email);

    if (tokenModel && tokenModel.new_password_token) {
      const mail = {
        email,
        text: 'Request Change Password',
        html: 'Hi! <br><br> Thanks for your registration<br><br>',
        link: `/auth/email/reset-password/${tokenModel.new_password_token}`,
        linkText: 'Request Change Password',
        subject: 'Verify your email',
      };
      return this.mailerService.sendEmail(mail);
    }

    throw new Error('REGISTER.USER_NOT_REGISTERED');
  }

  // TODO: remove email_token from here
  public async sendEmailVerification(
    email: string,
    email_token: string,
  ): Promise<boolean> {
    const emailVerificationModel = await this.emailVerificationModel.findOne({
      email,
    });

    if (
      emailVerificationModel &&
      emailVerificationModel.email_verification_token
    ) {
      const mail = {
        email,
        text: 'Here is your email verification link',
        html: 'Hi! <br><br> Thanks for your registration<br><br>',
        link: `/auth/verify?token=${email_token}`,
        linkText: 'Here is your email verification link',
        subject: 'Verify your email',
      };
      return this.mailerService.sendEmail(mail);
    }
    throw new Error('REGISTRATION.ERROR.MAIL_NOT_SENT');
  }

  public async verifyEmail(token: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationModel.findOne({
      email_verification_token: token,
    });

    if (emailVerification && emailVerification.email) {
      return this.usersService
        .findByEmail(emailVerification.email)
        .then(async (user) => {
          user.auth.email.valid = true;
          await this.usersService.updateOne(user);
          await this.emailVerificationModel.deleteOne({ email: user.email });
          return true;
        });
    }
    // todo: handle errors
  }

  public async resetPassword(
    email: string,
    forgot_password_token: string,
    new_password: string,
  ): Promise<boolean> {
    try {
      const forgotPasswordModel = await this.forgottenPasswordModel.findOne({
        email,
      });

      if (
        forgotPasswordModel &&
        forgotPasswordModel.new_password_token === forgot_password_token
      ) {
        await this.usersService.updateOnePassword(email, new_password);
        await this.forgottenPasswordModel.deleteOne({ email });
        return true;
      }
      return false;
    } catch (e) {
      throw Error(e);
    }
  }

  public async getEmailByForgotPasswordToken(
    new_password_token: string,
  ): Promise<ForgottenPassword> {
    return await this.forgottenPasswordModel
      .findOne({ new_password_token })
      .exec();
  }

  private async createToken(email: string, id: string) {
    const payload = { email, sub: id };
    return this.jwtService.sign(payload);
  }

  private formatUser(user: User): Partial<User> {
    return {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      settings: user.settings,
    };
  }

  async validateUser(signedUser: LoginCredentials): Promise<User> {
    const user = await this.usersService.findByEmail(signedUser.email);
    return user || null;
  }
}
