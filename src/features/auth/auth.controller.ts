import { Body, Controller, Post } from '@nestjs/common';
import { LoginPayload } from './models/login.payload';
import { RegisterPayload } from './models/register.payload';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() credentials: LoginPayload) {
    try {

    } catch (e) {

    }
  }

  @Post('register')
  async register(@Body() credentials: RegisterPayload) {
    try {
      return await this.authService.register(credentials);
    } catch (e) {
      // todo: handle exception
    }
  }
}
