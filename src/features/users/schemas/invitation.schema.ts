import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaOptions } from '@nestjs/mongoose/dist/decorators/schema.decorator';

// todo: unify
const schemaOptions: SchemaOptions = {
  collection: 'forgotten-passwords',
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
};

@Schema(schemaOptions)
export class Invitation extends Document {

  @Prop({ required: true, type: String, trim: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, type: String })
  invitation_token: string;

  @Prop({ required: true, type: Date })
  timestamp: Date;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
