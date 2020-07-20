import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private currentEnv: string = process.env.NODE_ENV || 'development';

  get(key: string): string {
    return process.env[key];
  }

  get port(): string | number {
    return process.env.PORT || 3000;
  }

  get isDevelopment(): boolean {
    return this.currentEnv === 'development';
  }

  get mongoUri(): string {
    return process.env.MONGO_URI;
  }

  get nodemailerConfig(): { nodemailer_email; nodemailer_password } {
    return {
      nodemailer_email: process.env.NODEMAILER_EMAIL,
      nodemailer_password: process.env.NODEMAILER_PASSWORD,
    };
  }

  get host(): string {
    return process.env.HOST;
  }

  get JWT() {
    return {
      Key: process.env.JWT_KEY || 'secretKey',
      AccessTokenTtl: parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 60 * 5, // 5m
      RefreshTokenTtl: parseInt(process.env.ACCESS_TOKEN_TTL, 10) || 30, // 30 Days
    };
  }
}
