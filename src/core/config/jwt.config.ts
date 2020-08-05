import { registerAs } from '@nestjs/config';

export enum jwtConfigEnum {
  key = 'jwt.key',
  access_token_ttl = 'jwt.access_token_ttl',
  refresh_token_ttl = 'jwt.refresh_token_ttl',
}

export default registerAs('jwt', () => ({
  key: process.env.JWT_KEY || 'secretKey',
  access_token_ttl: parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 60 * 5, // 5m
  refresh_token_ttl: parseInt(process.env.REFRESH_TOKEN_TTL, 10) || 30, // 30 Days
}));
