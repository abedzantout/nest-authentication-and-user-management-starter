import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EmailVerification {

  @Prop({ required: true, type: String, trim: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, type: String })
  email_verification_token: string;

  @Prop({ required: true, type: Date })
  timestamp: string;
}

export const EmailVerificationSchema = SchemaFactory.createForClass(EmailVerification);
