import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';

import { Invitation } from '../schemas/invitation.schema';

import { MailerService } from '../../../common/services/mailer/mailer.service';

@Injectable()
export class InvitationService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(Invitation.name)
    private readonly invitationModel: Model<Invitation>,
  ) {}

  public async createInvitation(email: string): Promise<Invitation> {
    return await this.invitationModel.create({
      email,
      invitation_token: uuidv4(),
      timestamp: new Date(),
    });
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
