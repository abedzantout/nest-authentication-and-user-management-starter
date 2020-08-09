import { DynamicModule, Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      exports: [...databaseProviders],
    };
  }
}
