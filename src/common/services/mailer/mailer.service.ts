import { Injectable } from '@nestjs/common';

import { createTransport, Transporter } from 'nodemailer';
import { EnvService } from '../../../core/config/env.service';

export interface MailerOptions {
  email: string;
  subject: string;
  text: string;
  html: string;
  linkText: string;
  link: string;
}

@Injectable()
export class MailerService {
  private readonly transporter: Transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: this.envService.nodemailerConfig.nodemailer_email,
      pass: this.envService.nodemailerConfig.nodemailer_password,
    },
  });

  private readonly host = this.envService.host;

  constructor(private readonly envService: EnvService) {}

  private generateLink(link: string) {
    return this.host + link;
  }

  private constructMailOptions({
    email,
    subject,
    text,
    html,
    linkText,
    link,
  }: MailerOptions) {
    return {
      from: this.envService.nodemailerConfig.nodemailer_email,
      to: email, // list of receivers (separated by ,)
      subject,
      text, // plain text body
      html: `
        ${html}
        ${linkText}: ${this.generateLink(link)}
      `,
    };
  }

  public async sendEmail(mailOptions: MailerOptions): Promise<boolean> {
    return await new Promise<boolean>(async (resolve, reject) => {
      return this.transporter.sendMail(
        this.constructMailOptions(mailOptions),
        async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        },
      );
    });
  }
}
