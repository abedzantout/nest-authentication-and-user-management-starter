import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class ForgotPasswordPayload {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  new_password: string;
}

export class ForgotPasswordParamPayload {
  @IsNotEmpty({ message: 'Verification token required' })
  @IsUUID()
  token: string;
}
