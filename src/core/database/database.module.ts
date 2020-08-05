import { Module } from '@nestjs/common';
// import { databaseProviders } from './database.providers';
const databaseProviders = [];
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
