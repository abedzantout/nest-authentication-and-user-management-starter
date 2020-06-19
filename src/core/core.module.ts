import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { MongoErrorHandlerInterceptor } from './interceptors/mongo-error-handler.interceptor';

const MODULES = [
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'secret',
    signOptions: { expiresIn: '10 hours' },
  }),
];
const PROVIDERS = [MongoErrorHandlerInterceptor];

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
