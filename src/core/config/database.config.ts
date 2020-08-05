import { registerAs } from '@nestjs/config';

const DEFAULT_MONGODB_PORT = 27017;

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || DEFAULT_MONGODB_PORT,
}));
