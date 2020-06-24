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
import { EmailVerificationPayload } from './payloads/email-verification.payload';
import { User } from '../../shared/users/schemas/user.schema';
import { MongoErrorHandlerInterceptor } from '../../core/interceptors/mongo-error-handler.interceptor';

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
      // return await this.authService.sendEmailVerification(params.email);
      return null;
    } catch (e) {

    }
  }

  @Get('verify')
  public async verifyEmail(@Query() params: EmailVerificationPayload): Promise<any> {
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

    }
  }

  @Post('reset-password/:token')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(@Param() params: EmailVerificationPayload) {
    try {
      // return await this.authService.resetPassword(params.email);
    } catch (e) {

    }
  }
}
