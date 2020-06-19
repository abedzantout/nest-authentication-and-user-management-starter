import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { UserRoles } from '../models/user.model';

@Schema({
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, result) => {
      result.id = result._id;
      delete result._id;
    },
  },
})
export class User extends Document {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop()
  password: string;

  // todo: define enum
  @Prop()
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
