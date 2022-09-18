import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration/configuration';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModule } from './database/database.module';
import { ReceiptsController } from './receipts/receipts.controller';
import { ReceiptsModule } from './receipts/receipts.module';
import { ReceiptsService } from './receipts/receipts.service';
import { SharedModule } from './shared/shared.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ReceiptsModule,
    ConfigurationModule,
    SharedModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot()],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class AppModule { }
