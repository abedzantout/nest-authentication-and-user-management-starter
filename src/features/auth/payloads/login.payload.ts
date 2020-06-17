import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginPayload {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
