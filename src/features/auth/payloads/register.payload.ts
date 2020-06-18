import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../../../shared/users/models/user.model';

export class RegisterPayload {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsOptional()
  role: UserRoles;
}
