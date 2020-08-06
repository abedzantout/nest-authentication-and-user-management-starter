import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { MongoErrorHandlerInterceptor } from './interceptors/mongo-error-handler.interceptor';
import { EnvService } from './config/env.service';
import { MailerService } from './mailer/mailer.service';
import { validationOptions, validationSchema } from './config/valiation-schema';

const MODULES = [
  ConfigModule.forRoot({ validationSchema, validationOptions }),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: process.env.JWT_KEY,
    signOptions: { expiresIn: '10 hours' },
  }),
];
const PROVIDERS = [EnvService, MongoErrorHandlerInterceptor, MailerService];

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
