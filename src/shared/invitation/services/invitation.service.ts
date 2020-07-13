import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';

import { ConfigService } from '../../../core/config/config.service';
import { Invitation } from '../schemas/invitation.schema';

@Injectable()
export class InvitationService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Invitation.name)
    private readonly invitationModel: Model<Invitation>,
  ) {}

  public async inviteUser(email: string): Promise<any> {
    const invitation = await this.invitationModel.create({
      email,
      invitation_token: uuidv4(),
      timestamp: new Date(),
    });

    if (invitation && invitation.invitation_token) {
      const transporter = nodemailer.createTransport({
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

      const link = `${this.configService.host}/invitation/${invitation.invitation_token}`;
      const mailOptions = {
        from: this.configService.nodemailerConfig.nodemailer_email,
        to: email, // list of receivers (separated by ,)
        subject: 'Invitation Email',
        text: 'Invitation Email',
        html:
          'Hi! <br><br> You have been invited to join the platform<br><br>' +
          `Here is your invitation link: ${link}`,
      };

      const sent = await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
      });

      return sent;
    } else {
      throw Error('INVITATION.ERROR');
    }
  }

  public async findOne(
    email: string,
    invitation_token: string,
  ): Promise<Invitation> {
    return await this.invitationModel
      .findOne({ email, invitation_token })
      .exec();
  }

  public async deleteOne(invitation_token: string): Promise<any> {
    return await this.invitationModel.deleteOne({ invitation_token }).exec();
  }
  public async findOneByInvitationToken(
    invitation_token: string,
  ): Promise<Invitation> {
    return await this.invitationModel.findOne({ invitation_token }).exec();
  }
}
