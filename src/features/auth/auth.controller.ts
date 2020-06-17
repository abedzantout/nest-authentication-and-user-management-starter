import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginPayload } from './payloads/login.payload';
import { RegisterPayload } from './payloads/register.payload';
import { AuthService } from './services/auth.service';
import { EmailVerificationPayload } from './payloads/email-verification.payload';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  public async login(@Body() credentials: LoginPayload) {
    try {
      return await this.authService.login(credentials);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  public async register(@Body() credentials: RegisterPayload) {
    try {
      return await this.authService.register(credentials);
    } catch (e) {
      // todo: handle exception
    }
  }

  @Get('email/resend-verification/:email')
  public async sendEmailVerification(@Param() params: EmailVerificationPayload): Promise<any> {
    try {
      return await this.authService.sendEmailVerification(params.email);
    } catch (e) {

    }
  }

  @Get('forgot-password/:email')
  async sendEmailForgotPassword(@Param() params: EmailVerificationPayload) {
    try {
      return await this.authService.sendEmailForgotPassword(params.email);
    } catch (e) {

    }
  }

  @Post('email/reset-password')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(@Param() params: EmailVerificationPayload) {
    try {
      return await this.authService.resetPassword(params.email);
    } catch (e) {

    }
  }
}
