import { Module } from '@nestjs/common';

// imported modules
import { SharedUsersModule } from './users/users.module';
import { InvitationSharedModule } from './invitation/invitation.module';

const sharedModules = [SharedUsersModule, InvitationSharedModule];

@Module({
  imports: [...sharedModules],
  exports: [...sharedModules],
  providers: [],
})
export class SharedModule {
}
