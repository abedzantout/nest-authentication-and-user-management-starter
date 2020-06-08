import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const modules = [AuthModule, UsersModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class FeaturesModule {}
