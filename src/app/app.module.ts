import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FeaturesModule } from '../features/features.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    CoreModule.forRoot(),
    CommonModule.forRoot(),
    SharedModule,
    FeaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
