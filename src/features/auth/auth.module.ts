import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { EmailVerification, EmailVerificationSchema } from './schemas/email-verification.schema';
import { ForgottenPassword, ForgottenPasswordSchema } from './schemas/forgotten-password.schema';
import { ConsentRegistry, ConsentRegistrySchema } from './schemas/consent-registry.schema';
import { CoreModule } from '../../core/core.module';
import { JwtService } from './services/jwt.service';

const providers = [AuthService];

@Module({
  imports: [
    SharedModule,
    CoreModule.forChild(),
    MongooseModule.forFeature([
      { name: EmailVerification.name, schema: EmailVerificationSchema },
      { name: ForgottenPassword.name, schema: ForgottenPasswordSchema },
      { name: ConsentRegistry.name, schema: ConsentRegistrySchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [...providers],
})
export class AuthModule {
}
