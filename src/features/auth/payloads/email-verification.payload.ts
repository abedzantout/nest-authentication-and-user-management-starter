import { IsNotEmpty, IsUUID } from 'class-validator';

export class EmailVerificationPayload {
  @IsNotEmpty({ message: 'Verification token required' })
  @IsUUID()
  token: string;
}
