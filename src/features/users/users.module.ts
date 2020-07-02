import { Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';

import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from './schemas/invitation.schema';
import { InvitationService } from './services/invitation.service';

const services = [InvitationService];

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [...services],
})
export class UsersModule {
}
