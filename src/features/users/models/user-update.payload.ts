import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdatePayload {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;
}
