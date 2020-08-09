import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { validationOptions, validationSchema } from './config/valiation-schema';

// config loaders
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import {
  AUTH_DEFAULT_EXPIRATION,
  AUTH_DEFAULT_STRATEGY,
} from './config/config';
import { EnvService } from './config/env.service';

const MODULES = [
  ConfigModule.forRoot({
    validationSchema,
    validationOptions,
    load: [databaseConfig, jwtConfig],
    isGlobal: true,
  }),
  PassportModule.register({ defaultStrategy: AUTH_DEFAULT_STRATEGY }),
  JwtModule.register({
    secret: process.env.JWT_KEY,
    signOptions: { expiresIn: AUTH_DEFAULT_EXPIRATION },
  }),
  DatabaseModule.forRoot(),
];
const PROVIDERS = [EnvService];

@Module({
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...MODULES, ...PROVIDERS],
})
export class CoreModule {
  static forRoot(entities = [], options?): DynamicModule {
    return {
      module: CoreModule,
      exports: [...PROVIDERS, ...MODULES],
    };
  }

  static forChild() {
    return {
      module: CoreModule,
      exports: [...PROVIDERS],
    };
  }
}
