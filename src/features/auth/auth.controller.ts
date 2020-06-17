import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginPayload } from './payloads/login.payload';
import { RegisterPayload } from './payloads/register.payload';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async login(@Body() credentials: LoginPayload) {
    try {
      return await this.authService.login(credentials);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async register(@Body() credentials: RegisterPayload) {
    try {
      return await this.authService.register(credentials);
    } catch (e) {
      // todo: handle exception
    }
  }

  @Get('forgot-password/:email')
  async sendEmailForgotPassword(@Param() params) {
    try {

    } catch (e) {

    }
  }
}
