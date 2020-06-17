import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { EmailVerification, EmailVerificationSchema } from './schemas/email-verification.schema';
import { ForgottenPassword, ForgottenPasswordSchema } from './schemas/forgotten-password.schema';
import { ConsentRegistry, ConsentRegistrySchema } from './schemas/consent-registry.schema';


@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      { name: EmailVerification.name, schema: EmailVerificationSchema },
      { name: ForgottenPassword.name, schema: ForgottenPasswordSchema },
      { name: ConsentRegistry.name, schema: ConsentRegistrySchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
}
