import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailVerificationPayload {
  @IsNotEmpty({ message: 'email required' })
  @IsEmail()
  email: string;
}
