import { IsNotEmpty, IsUUID } from 'class-validator';

export class EmailTokenVerificationPayload {
  @IsNotEmpty({ message: 'Verification token required' })
  @IsUUID()
  token: string;
}

export class EmailVerificationPayload {
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
