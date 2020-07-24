import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from '../core/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('restricted')
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('restricted/admin')
  @UseGuards(JwtAuthGuard)
  getAdminHello(): string {
    return this.appService.getHello();
  }

  @Get('restricted/owner')
  @UseGuards(JwtAuthGuard)
  getOwnerHello(): string {
    return this.appService.getHello();
  }

  @Get('restricted/user')
  @UseGuards(JwtAuthGuard)
  getUserHello(): string {
    return this.appService.getHello();
  }
}
