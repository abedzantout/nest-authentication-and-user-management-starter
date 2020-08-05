import * as Joi from '@hapi/joi';

export default {
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    PORT: Joi.number().default(3000),
    JWT_KEY: Joi.string().default('secretKey'),
    MONGO_URI: Joi.string().required(),
    ACCESS_TOKEN_TTL: Joi.string().default(60 * 5),
    REFRESH_TOKEN_TTL: Joi.string().default(30),
    NODEMAILER_EMAIL: Joi.string().optional(),
    NODEMAILER_PASSWORD: Joi.string().optional(),
    HOST: Joi.string().default('http://localhost:3000'),
  }),
  validationOptions: {
    allowUnknown: false,
    abortEarly: true,
  },
};
