import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UserDeletePayload {
  @IsNotEmpty()
  @IsMongoId({ message: 'Please provide a proper user id' })
  id: string;
}
