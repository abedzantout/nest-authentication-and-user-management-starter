import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { schemaOptions } from '../../../core/schemas/schema-options';

@Schema(schemaOptions)
export class Invitation extends Document {
  @Prop({
    required: true,
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true, type: String, unique: true })
  invitation_token: string;

  @Prop({ required: true, type: Date })
  timestamp: Date;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
