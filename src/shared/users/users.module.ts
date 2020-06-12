import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { User } from './schemas/user.entity';

const providers = [UsersService];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [...providers],
  exports: [...providers],
})
export class SharedUsersModule {
}
