import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRoles } from '../shared/users/models/user.model';
import { GateGuard } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('restricted')
  @UseGuards(JwtAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('restricted/admin')
  @GateGuard(UserRoles.admin)
  getAdminHello(): string {
    return this.appService.getHello();
  }

  @Get('restricted/owner')
  @GateGuard(UserRoles.owner)
  getOwnerHello(): string {
    return this.appService.getHello();
  }

  @Get('restricted/user')
  @GateGuard()
  getUserHello(): string {
    return this.appService.getHello();
  }
}
