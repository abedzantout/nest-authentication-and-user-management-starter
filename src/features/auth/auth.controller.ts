import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginPayload } from './payloads/login.payload';
import {
  RegisterByInvitationParamPayload,
  RegisterPayload,
} from './payloads/register.payload';
import { AuthService } from './services/auth.service';
import {
  EmailTokenVerificationPayload,
  EmailVerificationPayload,
} from './payloads/email-verification.payload';
import { ResponseError, ResponseSuccess } from '../../common/response/response';
import {
  ForgotPasswordParamPayload,
  ForgotPasswordPayload,
} from './payloads/forgot-password.payload';
import { ResponseInterface } from '../../common/response/response.interface';
import { User } from '../../shared/users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  public async login(
    @Body() credentials: LoginPayload,
  ): Promise<ResponseInterface<User>> {
    try {
      const response = await this.authService.login(credentials);
      return new ResponseSuccess('LOGIN.SUCCESS', response);
    } catch (e) {
      return new ResponseError('LOGIN.ERROR', e.message);
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  public async register(
    @Body() credentials: RegisterPayload,
  ): Promise<ResponseInterface<User>> {
    try {
      const emailVerification = await this.authService.register(credentials);
      const emailSent = await this.authService.sendEmailVerification(
        emailVerification.email,
        emailVerification.email_verification_token,
      );
      if (emailSent) {
        return new ResponseSuccess(
          'REGISTRATION.USER_REGISTERED_SUCCESSFULLY',
          emailSent,
        );
      }
      return new ResponseError('REGISTRATION.REGISTRATION.ERROR.MAIL_NOT_SENT');
    } catch (e) {
      return new ResponseError('REGISTER.ERROR', e.message);
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  public async registerByInvitation(
    @Query() params: RegisterByInvitationParamPayload,
    @Body() credentials: RegisterPayload,
  ): Promise<ResponseInterface<User>> {
    try {
      const response = await this.authService.registerByInvitation(
        params.invitation_token,
        credentials,
      );
      return new ResponseSuccess('INVITATION.REGISTER_SUCCESS', response);
    } catch (e) {
      return new ResponseError('INVITATION.REGISTER_ERROR', e.message);
    }
  }

  @Get('resend-verification/:email')
  public async sendEmailVerification(
    @Param() params: EmailVerificationPayload,
  ): Promise<any> {
    try {
      const {
        email_verification_token,
      } = await this.authService.createEmailVerificationToken(params.email);

      const emailSent = await this.authService.sendEmailVerification(
        params.email,
        email_verification_token,
      );

      if (emailSent) {
        return new ResponseSuccess('LOGIN.EMAIL_RESENT', null);
      }
      return new ResponseError('REGISTRATION.ERROR.MAIL_NOT_SENT');
    } catch (error) {
      return new ResponseError('LOGIN.ERROR.SEND_EMAIL', error);
    }
  }

  @Get('verify')
  public async verifyEmail(
    @Query() params: EmailTokenVerificationPayload,
  ): Promise<any> {
    try {
      await this.authService.verifyEmail(params.token);
      return new ResponseSuccess('VERIFICATION.SUCCESS');
    } catch (e) {
      return new ResponseError('VERIFICATION.ERROR', e);
    }
  }

  @Get('forgot-password/:email')
  async sendEmailForgotPassword(@Param() params: any): Promise<any> {
    try {
      const emailForgotPasswordSent: boolean = await this.authService.sendEmailForgotPassword(
        params.email,
      );

      return new ResponseSuccess(
        'RESET_PASSWORD.EMAIL_SENT',
        emailForgotPasswordSent,
      );
    } catch (e) {
      return new ResponseError(e.message);
    }
  }

  @Get('reset-password')
  @HttpCode(HttpStatus.OK)
  public async getEmailForResetPassword(
    @Query() params: ForgotPasswordParamPayload,
  ) {
    try {
      return this.authService.getEmailByForgotPasswordToken(params.token);
    } catch (e) {
      return e;
    }
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(
    @Query() params: ForgotPasswordParamPayload,
    @Body() forgotPassword: ForgotPasswordPayload,
  ) {
    try {
      const resetPassword = await this.authService.resetPassword(
        forgotPassword.email,
        params.token,
        forgotPassword.new_password,
      );
      if (resetPassword) {
        return new ResponseSuccess('RESET_PASSWORD.SUCCESS');
      }
      return new ResponseError('RESET_PASSWORD.CHANGE_PASSWORD_ERROR');
    } catch (e) {
      return new ResponseError('RESET_PASSWORD.ERROR', e);
    }
  }
}
