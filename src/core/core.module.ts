import { DynamicModule, Module } from '@nestjs/common';
import { MongoErrorHandlerInterceptor } from './interceptors/mongo-error-handler.interceptor';

const MODULES = [];
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
