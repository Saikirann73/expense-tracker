import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { DatabaseModule } from './../database/database.module';
import { SharedModule } from './../shared/shared.module';
import { ConfigurationModule } from './../configuration/configuration.module';
import { ReceiptsReportsService } from './receiptsReports.service';

@Module({
  imports: [
    DatabaseModule,
    SharedModule,
    ConfigurationModule
  ],
  controllers: [ReceiptsController],
  providers: [ReceiptsService, ReceiptsReportsService]
})
export class ReceiptsModule { }
