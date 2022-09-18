import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { HttpModule } from '@nestjs/axios';
import { Logger } from './logger/logger-service';

@Module({
  imports: [HttpModule.register({
    headers: {
      'Content-Type': 'application/json',
    }
  }), ConfigurationModule],
  providers: [Logger],
  exports: [Logger]
})
export class SharedModule { }
