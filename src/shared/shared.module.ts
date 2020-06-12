import { Module } from '@nestjs/common';

// imported modules
import { SharedUsersModule } from './users/users.module';

const sharedModules = [SharedUsersModule];

@Module({
  imports: [...sharedModules],
  exports: [...sharedModules],
})
export class SharedModule {
}
