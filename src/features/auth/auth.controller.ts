import { Body, Controller, Post } from '@nestjs/common';
import { LoginPayload } from './models/login.payload';
import { RegisterPayload } from './models/register.payload';

@Controller('auth')
export class AuthController {

  constructor() {
  }
  @Post('login')
  async login(@Body() credentials: LoginPayload) {
  }

  @Post('register')
  async register(@Body() credentials: RegisterPayload) {
  }
}
