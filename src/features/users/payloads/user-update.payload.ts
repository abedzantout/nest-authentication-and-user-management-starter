import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../../../shared/users/models/user.model';

export class UserUpdatePayload {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role: UserRoles;
}
