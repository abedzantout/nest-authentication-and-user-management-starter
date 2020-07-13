import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';

import {
  EmailVerification,
  EmailVerificationSchema,
} from './schemas/email-verification.schema';
import {
  ForgottenPassword,
  ForgottenPasswordSchema,
} from './schemas/forgotten-password.schema';
import {
  ConsentRegistry,
  ConsentRegistrySchema,
} from './schemas/consent-registry.schema';

import { JwtStrategy } from './strategies/jwt.strategy';

const providers = [AuthService, JwtStrategy];

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
export class AuthModule {}
