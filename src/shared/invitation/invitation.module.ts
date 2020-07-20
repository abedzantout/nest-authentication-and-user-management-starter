import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invitation, InvitationSchema } from './schemas/invitation.schema';
import { InvitationService } from './services/invitation.service';
import { CoreModule } from '../../core/core.module';
import { SharedUsersModule } from '../users/users.module';

const providers = [InvitationService];

@Module({
  imports: [
    CoreModule.forChild(),
    SharedUsersModule,
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
    ]),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class InvitationSharedModule {}
