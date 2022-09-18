import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { ObjectId } from 'mongodb';
import { join } from 'path';
import { ReceiptsRepository } from './../database/repositories/receipts-repository';
import { Logger } from './../shared/logger/logger-service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { Receipt } from './entities/receipt.entity';
import { ReportType } from './enum/reportType';

@Injectable()
export class ReceiptsService {
  constructor(
    private receiptsRepo: ReceiptsRepository,
    private logger: Logger,
  ) { }

  public async create(createReceiptDto: CreateReceiptDto): Promise<string> {
    const receipt: Receipt = {
      category: createReceiptDto.category,
      cost: createReceiptDto.cost,
      title: createReceiptDto.title,
      createdDateTime: new Date(new Date().toUTCString()),
    };
    const result = await this.receiptsRepo.create(receipt);
    this.logger.info({
      module: "ReceiptsService",
      method: "create",
      result: `Successfully created a receipt with id : ${result.id}`
    });
    return result.toString();
  }

  public async getAll() {
    var result = (await this.receiptsRepo.findAll()) as Receipt[];
    return result
  }

  public async getById(id: string) {
    return await this.receiptsRepo.findOneById(new ObjectId(id));
  }

  public async deleteAll() {
    var filterDefinition: {}
    return await this.receiptsRepo.deleteMany(filterDefinition);
  }

  public async getReport(reportType: ReportType): Promise<StreamableFile> {
    const fileName = reportType === ReportType.ReceiptReport ? 'src/receipts/reports/ReceiptsReport.csv' : 'src/receipts/reports/ReceiptsReport.csv';
    const file = createReadStream(join(process.cwd(), fileName));
    var stream = new StreamableFile(file);
    return stream;
  }
}
