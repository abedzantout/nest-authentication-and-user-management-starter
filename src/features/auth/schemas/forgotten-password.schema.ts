import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ForgottenPassword {

  @Prop({ required: true, type: String, trim: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, type: String })
  new_password_token: string;

  @Prop({ required: true, type: Date })
  timestamp: string;
}

export const ForgottenPasswordSchema = SchemaFactory.createForClass(ForgottenPassword);
