import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  email: process.env.NODEMAILER_EMAIL,
  password: process.env.NODEMAILER_PASSWORD,
}));
