import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  NodeEnvEnum,
  MailerConfigEnum,
  DatabaseConfigEnum,
  EnvironmentVariablesEnum,
  jwtConfigEnum,
} from './config';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  private currentEnv: NodeEnvEnum =
    this.configService.get<NodeEnvEnum>(EnvironmentVariablesEnum.NODE_ENV) ||
    NodeEnvEnum.development;

  get port(): string | number {
    return this.configService.get<number>(EnvironmentVariablesEnum.PORT);
  }

  get isDevelopment(): boolean {
    return this.currentEnv === NodeEnvEnum.development;
  }

  get mongoUri(): string {
    return this.configService.get<string>(DatabaseConfigEnum.mongo_uri);
  }

  get nodemailerConfig(): {
    nodemailer_email: string;
    nodemailer_password: string;
  } {
    return {
      nodemailer_email: this.configService.get<string>(MailerConfigEnum.email),
      nodemailer_password: this.configService.get<string>(
        MailerConfigEnum.password,
      ),
    };
  }

  get host(): string {
    return this.configService.get<string>(EnvironmentVariablesEnum.HOST);
  }

  get JWT(): { key: string; accessTokenTtl: number; refreshTokenTtl: number } {
    return {
      key: this.configService.get<string>(jwtConfigEnum.key),
      accessTokenTtl: this.configService.get<number>(
        jwtConfigEnum.access_token_ttl,
      ),
      refreshTokenTtl: this.configService.get<number>(
        jwtConfigEnum.refresh_token_ttl,
      ),
    };
  }
}
