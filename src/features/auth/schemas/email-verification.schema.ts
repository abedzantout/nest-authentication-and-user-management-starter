import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaOptions } from '@nestjs/mongoose/dist/decorators/schema.decorator';

// todo: unify
const schemaOptions: SchemaOptions = {
  collection: 'email-verifications',
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
};

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
