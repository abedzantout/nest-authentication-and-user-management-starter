import { Injectable } from '@nestjs/common';

import { createTransport, Transporter, SendMailOptions } from 'nodemailer';
import { ConfigService } from '../config/config.service';

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
  private transporter: Transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: this.configService.nodemailerConfig.nodemailer_email,
      pass: this.configService.nodemailerConfig.nodemailer_password,
    },
  });

  private host = '';
  private mailOptions: SendMailOptions = {};

  constructor(private readonly configService: ConfigService) {
    this.host = this.configService.host;
  }

  private generateLink(link: string) {
    return this.host + link;
  }

  private constructMailOptions({ email, subject, text, html, linkText, link }: MailerOptions) {
    return {
      from: this.host,
      to: email, // list of receivers (separated by ,)
      subject,
      text, // plain text body
      html: `
        ${html}
        ${linkText}: ${this.generateLink(link)}
      `,
    };
  }

  public async sendEmail(mailOptions) {
    return await new Promise<boolean>(async (resolve, reject) => {
      return this.transporter.sendMail(mailOptions,
        async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
    });

  }
}
