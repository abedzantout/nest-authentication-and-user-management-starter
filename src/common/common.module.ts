import { DynamicModule, Module } from '@nestjs/common';
import { MailerService } from './services/mailer/mailer.service';

const PROVIDERS = [MailerService];
const MODULES = [];

@Module({
  imports: [...MODULES],
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
