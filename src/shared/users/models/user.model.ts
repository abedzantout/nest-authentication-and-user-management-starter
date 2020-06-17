export enum UserRoles {
  admin = 'admin',
  user = 'user',
}

export interface UserInterface {
  readonly id?: string;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly password: string;
  readonly role: UserRoles;
}
