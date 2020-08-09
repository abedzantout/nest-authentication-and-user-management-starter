import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';

import { UsersController } from './users.controller';
import { CoreModule } from '../../core/core.module';

import { InvitationRequestService } from './services/invitation-request.service';
import { CommonModule } from '../../common/common.module';

const services = [InvitationRequestService];

@Module({
  imports: [SharedModule, CoreModule.forChild(), CommonModule],
  controllers: [UsersController],
  providers: [...services],
})
export class UsersModule {}
