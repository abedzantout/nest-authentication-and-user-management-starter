import { UserRoles } from '../../../shared/users/models/user.model';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRoles;
}
