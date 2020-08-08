import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../shared/users/services/users.service';
import { InvitationService } from '../../../shared/invitation/services/invitation.service';
import { MailerService } from '../../../common/services/mailer/mailer.service';

@Injectable()
export class InvitationRequestService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService,
    private readonly invitationService: InvitationService,
  ) {}

  async invite(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (user) throw new Error('USER_INVITATION.USER_ALREADY_EXISTS');

    return this.sendInvitationEmail(email);
  }

  async sendInvitationEmail(email: string): Promise<boolean> {
    const invitation = await this.invitationService.createInvitation(email);

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
}
