import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
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

export class RegisterByInvitationParamPayload {
  @IsNotEmpty()
  @IsUUID(4, { message: 'Token is invalid' })
  invitation_token: string;
}
