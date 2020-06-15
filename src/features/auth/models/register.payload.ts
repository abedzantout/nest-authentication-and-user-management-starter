import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPayload {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;
}
