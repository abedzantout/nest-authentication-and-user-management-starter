import { SchemaOptions } from '@nestjs/mongoose/dist/decorators/schema.decorator';

export const schemaOptions: SchemaOptions = {
  collection: 'email-verifications',
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
};
