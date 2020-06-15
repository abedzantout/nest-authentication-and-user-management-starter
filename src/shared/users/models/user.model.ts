import { ObjectID } from 'typeorm';

export interface UserInterface {
  readonly id?: ObjectID;
  readonly first_name: string;
  readonly last_name: string;
  readonly password: string;
  readonly email: string;
}
