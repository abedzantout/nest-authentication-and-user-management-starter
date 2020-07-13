import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './services/users.service';
import { User, UserSchema } from './schemas/user.schema';

const providers = [UsersService];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' },
    ]),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class SharedUsersModule {}
