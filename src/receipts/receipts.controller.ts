import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { ReportType } from './enum/reportType';
import type { Response } from 'express';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'The receipt has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Invalid receipt information' })
  create(@Body() createReceiptDto: CreateReceiptDto) {
    return this.receiptsService.create(createReceiptDto);
  }

  @Get()
  getReceipts() {
    return this.receiptsService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  getReceiptsById(@Param('id') id: string) {
    return this.receiptsService.getById(id);
  }

  @Get('report/:reportType')
  @ApiParam({ name: 'reportType', enum: ReportType })
  async getReport(@Param('reportType') reportType: ReportType, @Res({ passthrough: true }) res: Response) {
    res.set({
      'Content-Type': 'text/csv'
    });

    return await this.receiptsService.getReport(reportType);
  }
}
