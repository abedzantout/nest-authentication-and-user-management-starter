import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  key: process.env.JWT_KEY || 'secretKey',
  access_token_ttl: parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 60 * 5, // 5m
  refresh_token_ttl: parseInt(process.env.REFRESH_TOKEN_TTL, 10) || 30, // 30 Days
}));
