export enum DatabaseConfigEnum {
  mongo_uri = 'database.mongo_uri',
}

export enum NodeEnvEnum {
  development = 'development',
  production = 'production',
  test = 'test',
  provision = 'provision',
}

export enum MailerConfigEnum {
  email = 'mailer.email',
  password = 'mailer.password',
}

export enum EnvironmentVariablesEnum {
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  HOST = 'HOST',
}

export enum jwtConfigEnum {
  key = 'jwt.key',
  access_token_ttl = 'jwt.access_token_ttl',
  refresh_token_ttl = 'jwt.refresh_token_ttl',
}

export const AUTH_DEFAULT_STRATEGY = 'jwt';
export const AUTH_DEFAULT_EXPIRATION = '10 hours';
