import { ObjectID } from 'typeorm';

export interface UserInterface {
  readonly id?: ObjectID;
  readonly name: string;
  readonly password: string;
  readonly email: string;
}
