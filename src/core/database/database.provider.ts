import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigEnum } from '../config/config';

const mongooseOptions: MongooseModuleOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  retryAttempts: 4,
};

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>(DatabaseConfigEnum.mongo_uri),
      ...mongooseOptions,
    }),
    inject: [ConfigService],
  }),
];
