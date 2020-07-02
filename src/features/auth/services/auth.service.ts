import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';

import { LoginCredentials, RegisterCredentials } from '../models/credentials.interface';

import { User } from '../../../shared/users/schemas/user.schema';
import { UsersService } from '../../../shared/users/services/users.service';

// schemas
import { ConsentRegistry } from '../schemas/consent-registry.schema';
import { EmailVerification } from '../schemas/email-verification.schema';
import { ForgottenPassword } from '../schemas/forgotten-password.schema';
import { ConfigService } from '../../../core/config/config.service';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService,
              private readonly configService: ConfigService,
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

    await this.saveUserConsent(user.email);

    const createVerificationToken = await this.createEmailVerificationToken(user.email);

    await this.sendEmailVerification(user.email, createVerificationToken.email_verification_token);

    return user;
  }

  public async saveUserConsent(email: string): Promise<ConsentRegistry> {

    const userConsent = {
      email: email,
      privacy_policy: 'privacy policy',
      accepted_policy: true,
      checkbox_text: 'I accept privacy policy',
      cookie_policy: true,
      date: new Date(),
    };
    return await this.consentRegistryModel.create({ ...userConsent });
  }

  public async createEmailVerificationToken(email: string): Promise<EmailVerification> {
    const emailVerification = await this.emailVerificationModel.findOne({ email });

    if (emailVerification && ((new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 < 15)) {
      throw new HttpException('LOGIN.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.emailVerificationModel.findOneAndUpdate({ email }, {
        email,
        email_verification_token: uuidv4(),
        timestamp: new Date(),
      },
      { upsert: true, new: true })
      .exec();

  }

  public async login(credentials: LoginCredentials): Promise<User | any> {
    const user: User | any = await this.usersService.findUserAndPasswordById(credentials.email, credentials.password);
    if (!user) throw Error('LOGIN.USER_NOT_FOUND');
    if (!user.auth.email.valid) throw Error('LOGIN.EMAIL_NOT_VERIFIED');
    const access_token = await this.createToken(user.email, user.id);
    return { user, access_token };
  }

  public async createForgottenPasswordToken(email: string) {
    const forgottenPassword = await this.forgottenPasswordModel.findOne({ email });

    if (forgottenPassword && ((new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15)) {
      throw new HttpException('RESET_PASSWORD.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
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
    throw new HttpException('LOGIN.ERROR.GENERIC_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);

  }

  public async sendEmailForgotPassword(email) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const tokenModel = await this.createForgottenPasswordToken(email);

    if (tokenModel && tokenModel.new_password_token) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: this.configService.nodemailerConfig.nodemailer_email,
          pass: this.configService.nodemailerConfig.nodemailer_password,
        },
      });

      const link = `${this.configService.host}/auth/email/reset-password/${tokenModel.new_password_token}`;
      const mailOptions = {
        from: this.configService.nodemailerConfig.nodemailer_email,
        to: email, // list of receivers (separated by ,)
        subject: 'Verify Email',
        text: 'Verify Email',
        html: 'Hi! <br><br> Request Change Password<br><br>' +
          `Here is your reset password link: ${link}`,
      };

      const sent = await new Promise<boolean>(async function(resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
      });
      return sent;
    }
    throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
  }

  // TODO: remove email_token from here
  public async sendEmailVerification(email: string, email_token: string): Promise<boolean> {
    const emailVerificationModel = await this.emailVerificationModel.findOne({ email });

    if (emailVerificationModel && emailVerificationModel.email_verification_token) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: this.configService.nodemailerConfig.nodemailer_email,
          pass: this.configService.nodemailerConfig.nodemailer_password,
        },
      });

      const link = `${this.configService.host}auth/verify?token=${email_token}`;
      const mailOptions = {
        from: this.configService.nodemailerConfig.nodemailer_email,
        to: email, // list of receivers (separated by ,)
        subject: 'Verify Email',
        text: 'Verify Email',
        html: 'Hi! <br><br> Thanks for your registration<br><br>' +
          `Here is your email verification link: ${link}`,
      };

      const sent = await new Promise<boolean>(async function(resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
      });

      return sent;
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);

    }
  }

  public async verifyEmail(token: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationModel.findOne({ email_verification_token: token });

    if (emailVerification && emailVerification.email) {

      return this.usersService.findByEmail(emailVerification.email).then(async user => {
        user.auth.email.valid = true;
        await this.usersService.updateOne(user);
        await this.emailVerificationModel.deleteOne({ email: user.email });
        return true;
      });
    }
    // todo: handle errors
  }

  public async resetPassword(email: string, forgot_password_token: string, new_password: string): Promise<boolean> {

    try {
      const forgotPasswordModel = await this.forgottenPasswordModel.findOne({ email });

      if (forgotPasswordModel && forgotPasswordModel.new_password_token === forgot_password_token) {
        await this.usersService.updateOnePassword(email, new_password);
        await this.forgottenPasswordModel.deleteOne({ email });
        return true;
      }
      return false;
    } catch (e) {
      throw Error(e);
    }

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
