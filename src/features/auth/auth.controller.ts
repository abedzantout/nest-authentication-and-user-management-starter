import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginPayload } from './models/login.payload';
import { RegisterPayload } from './models/register.payload';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() credentials: LoginPayload) {
    try {
      return await this.authService.login(credentials);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() credentials: RegisterPayload) {
    try {
      return await this.authService.register(credentials);
    } catch (e) {
      // todo: handle exception
    }
  }
}
