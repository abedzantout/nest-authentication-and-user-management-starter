import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ConsentRegistry {

  @Prop({ required: true, type: String, trim: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, type: String })
  checkbox_text: string;

  @Prop({ required: true, type: Date })
  date: string;

  @Prop({ required: true, type: Boolean })
  privacy_policy: boolean;

  @Prop({ required: true, type: Boolean })
  cookie_policy: boolean;

  @Prop({ required: true, type: Boolean })
  accepted_policy: boolean;
}

export const ConsentRegistrySchema = SchemaFactory.createForClass(ConsentRegistry);
