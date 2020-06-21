import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaOptions } from '@nestjs/mongoose/dist/decorators/schema.decorator';

import { UserRoles } from '../models/user.model';

// todo: unify
const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, result) => {
      result.id = result._id;
      delete result._id;
    },
  },
};

@Schema(schemaOptions)
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
