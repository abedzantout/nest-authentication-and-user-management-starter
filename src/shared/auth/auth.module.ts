import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ConsentRegistry,
  ConsentRegistrySchema,
} from './schemas/consent-registry.schema';
import { ConsentRegistryService } from './services/consent-registry.service';

const providers = [ConsentRegistryService];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConsentRegistry.name, schema: ConsentRegistrySchema },
    ]),
  ],
  providers: [...providers],
  exports: [...providers],
})
export class SharedAuthModule {}
