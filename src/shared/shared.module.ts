import { Module } from '@nestjs/common';

// imported modules
import { SharedUsersModule } from './users/users.module';
import { InvitationSharedModule } from './invitation/invitation.module';
import { SharedAuthModule } from './auth/auth.module';

const sharedModules = [
  SharedUsersModule,
  InvitationSharedModule,
  SharedAuthModule,
];

@Module({
  imports: [...sharedModules],
  exports: [...sharedModules],
  providers: [],
})
export class SharedModule {}
