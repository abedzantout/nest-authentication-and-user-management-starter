import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FeaturesModule } from '../features/features.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';


const mongooseOptions: MongooseModuleOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  retryAttempts: 4,
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoreModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, mongooseOptions),
    SharedModule,
    FeaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
