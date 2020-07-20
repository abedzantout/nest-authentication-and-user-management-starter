import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../../../shared/users/models/user.model';

export class UserPayload {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: UserRoles;
}
