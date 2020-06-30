import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post, Query, UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginPayload } from './payloads/login.payload';
import { RegisterPayload } from './payloads/register.payload';
import { AuthService } from './services/auth.service';
import { EmailTokenVerificationPayload, EmailVerificationPayload } from './payloads/email-verification.payload';
import { User } from '../../shared/users/schemas/user.schema';
import { MongoErrorHandlerInterceptor } from '../../core/interceptors/mongo-error-handler.interceptor';
import { ResponseError, ResponseSuccess } from '../../core/response/response';
import { ForgotPasswordPayload } from './payloads/forgot-password.payload';

@Controller('auth')
@UseInterceptors(new MongoErrorHandlerInterceptor())
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  public async login(@Body() credentials: LoginPayload): Promise<User> {
    try {
      return await this.authService.login(credentials);
    } catch (e) {
      throw new HttpException(
        {
          message: e.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  public async register(@Body() credentials: RegisterPayload): Promise<User> {
    try {
      return await this.authService.register(credentials);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @Get('resend-verification/:email')
  public async sendEmailVerification(@Param() params: EmailVerificationPayload): Promise<any> {
    try {
      const { email_verification_token } = await this.authService.createEmailVerificationToken(params.email);

      const emailSent = await this.authService.sendEmailVerification(params.email, email_verification_token);

      if (emailSent) {
        return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
      }
      return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
    } catch (error) {
      return new ResponseError('LOGIN.ERROR.SEND_EMAIL', error);
    }
  }

  @Get('verify')
  public async verifyEmail(@Query() params: EmailTokenVerificationPayload): Promise<any> {
    try {
      // todo: login user automatically
      return await this.authService.verifyEmail(params.token);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('forgot-password/:email')
  async sendEmailForgotPassword(@Param() params: any) {
    try {
      return await this.authService.sendEmailForgotPassword(params.email);
    } catch (e) {
      console.error(e);
    }
  }

  @Post('reset-password/:token')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(@Param() params: ForgotPasswordPayload) {
    try {
      const resetPassword = await this.authService.resetPassword(params.email, params.forgot_password_token, params.new_password);
      if (resetPassword) {
        return new ResponseSuccess('RESET_PASSWORD.SUCCESS');
      }
      return new ResponseError('RESET_PASSWORD.CHANGE_PASSWORD_ERROR');
    } catch (e) {

      return e;
    }
  }
}
