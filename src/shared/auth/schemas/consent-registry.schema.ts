import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { schemaOptions } from '../../../core/schemas/schema-options';

@Schema(schemaOptions)
export class ConsentRegistry extends Document {
  @Prop({
    required: true,
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({ required: true, type: String })
  checkbox_text: string;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true, type: String })
  privacy_policy: string;

  @Prop({ required: true, type: Boolean })
  cookie_policy: boolean;

  @Prop({ required: true, type: Boolean })
  accepted_policy: boolean;
}

export const ConsentRegistrySchema = SchemaFactory.createForClass(
  ConsentRegistry,
);
