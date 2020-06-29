import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ForgotPasswordPayload {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Verification token required' })
  @IsUUID()
  forgot_password_token: string;

  @IsNotEmpty()
  new_password: string;
}
