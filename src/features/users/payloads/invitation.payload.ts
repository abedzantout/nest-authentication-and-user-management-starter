import { IsEmail, IsNotEmpty } from 'class-validator';

export class InvitationPayload {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
