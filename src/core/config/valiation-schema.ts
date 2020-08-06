import * as Joi from '@hapi/joi';
import { NodeEnvEnum } from './config';

const JWT_DEFAULT_SECRET = 'secretKey';
const DEFAULT_HOST = 'http://localhost:3000/';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(
      NodeEnvEnum.development,
      NodeEnvEnum.production,
      NodeEnvEnum.test,
      NodeEnvEnum.provision,
    )
    .default(NodeEnvEnum.development),
  PORT: Joi.number().default(3000),
  JWT_KEY: Joi.string().default(JWT_DEFAULT_SECRET),
  MONGODB_CONNECTION_STRING: Joi.string().required(),
  MONGODB_CONNECTION_TEST_STRING: Joi.string().optional(),
  ACCESS_TOKEN_TTL: Joi.string().default(60 * 5),
  REFRESH_TOKEN_TTL: Joi.string().default(30),
  NODEMAILER_EMAIL: Joi.string().optional(),
  NODEMAILER_PASSWORD: Joi.string().optional(),
  HOST: Joi.string().default(DEFAULT_HOST),
});

export const validationOptions = {
  // allowUnknown: false,
  abortEarly: true,
};
