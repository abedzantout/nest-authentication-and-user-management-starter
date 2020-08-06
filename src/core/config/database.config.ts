import { registerAs } from '@nestjs/config';

export enum DatabaseConfigEnum {
  mongo_uri = 'database.mongo_uri',
}

export default registerAs('database', () => ({
  mongo_uri: process.env.MONGO_URI,
}));
