import { DynamicModule, Module } from '@nestjs/common';
import { MailerService } from './services/mailer/mailer.service';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '../core/core.module';

const PROVIDERS = [MailerService];
const MODULES = [];

@Module({
  imports: [...MODULES, CoreModule.forChild()],
  providers: [...PROVIDERS],
  exports: [...MODULES, ...PROVIDERS],
})
export class CommonModule {
  static forRoot(entities = [], options?): DynamicModule {
    return {
      module: CommonModule,
      exports: [...PROVIDERS, ...MODULES],
    };
  }
}
