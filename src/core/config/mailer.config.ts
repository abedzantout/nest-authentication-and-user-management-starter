import { registerAs } from '@nestjs/config';

export enum MailerConfigEnum {
  email = 'mailer.email',
  password = 'mailer.password',
}

export default registerAs('mailer', () => ({
  email: process.env.NODEMAILER_EMAIL,
  password: process.env.NODEMAILER_PASSWORD,
}));
