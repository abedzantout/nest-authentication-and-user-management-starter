import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Invitation } from '../schemas/invitation.schema';
import { MailerService } from '../../../core/mailer/mailer.service';

@Injectable()
export class InvitationService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(Invitation.name)
    private readonly invitationModel: Model<Invitation>,
  ) {
  }

  public async inviteUser(email: string): Promise<boolean> {
    const invitation = await this.invitationModel.create({
      email,
      invitation_token: uuidv4(),
      timestamp: new Date(),
    });

    const mail = {
      email,
      text: 'Invitation to join our platform',
      html: 'Hi! <br><br> You have been invited to join our platform <br><br>',
      link: `/invitation/${invitation.invitation_token}`,
      linkText: 'Invitation Link: ',
      subject: 'Invitation to join our platform',
    };
    return this.mailerService.sendEmail(mail);
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
