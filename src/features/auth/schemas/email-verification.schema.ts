import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { schemaOptions } from '../../../core/schemas/schema-options';

@Schema(schemaOptions)
export class EmailVerification extends Document {
  @Prop({
    required: true,
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true, type: String })
  email_verification_token: string;

  @Prop({ required: true, type: Date })
  timestamp: Date;
}

export const EmailVerificationSchema = SchemaFactory.createForClass(
  EmailVerification,
);
