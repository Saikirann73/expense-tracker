import { Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Logger } from './../shared/logger/logger-service';
import { CategoryReport } from './entities/categoryReport.entity';
import { Receipt } from './entities/receipt.entity';
import { ReceiptReport } from './entities/receiptReport.entity';
import { ReceiptsService } from './receipts.service';
const ObjectsToCsv = require('objects-to-csv');

@Injectable()
export class ReceiptsReportsService {
    public static ReportsPath = 'src/receipts/reports/'
    constructor(
        private schedulerRegistry: SchedulerRegistry,
        private receiptsService: ReceiptsService,
        @Inject('Application_Config')
        private applicationConfig: any,
        private logger: Logger) {
        const job = new CronJob(this.applicationConfig.reportsCronInterval, async () => {
            await this.generateReports();
        });

        this.schedulerRegistry.addCronJob('generateReports', job);
        job.start();
    }

    async generateReports() {
        try {
            const receipts = await this.receiptsService.getAll();
            const totalCosts = receipts.reduce((a, { cost }) => a + cost, 0);
            const receiptsReports: ReceiptReport[] = [];
            const categoryReports: CategoryReport[] = [];
            receipts.forEach(x => {
                this.generateReceiptReportRecord(x, totalCosts, receiptsReports);
                this.generateCategoryReportRecord(categoryReports, x);
            });

            await this.saveCsv(`${ReceiptsReportsService.ReportsPath}/ReceiptsReport.csv`, receiptsReports)
            this.logger.info({
                module: "ReceiptsReportsService",
                method: "generateReports",
                result: `Successfully created a receipt report`
            });

            categoryReports.forEach(x => {
                const percent = ((x.count / receipts.length) * 100);
                const percentTwoDecimals = Math.round(percent * 100) / 100
                x.percentage = percentTwoDecimals
            })
            await this.saveCsv(`${ReceiptsReportsService.ReportsPath}/CategoryReport.csv`, categoryReports)
            this.logger.info({
                module: "ReceiptsReportsService",
                method: "generateReports",
                result: `Successfully created a category report`
            });
            await this.receiptsService.deleteAll();
        } catch (error) {
            this.logger.error({
                module: "ReceiptsReportsService",
                method: "generateReports",
                result: `Failed to generate the reports`,
            });
            throw new Error("Failed to generate the reports");
        }
    }

    private generateCategoryReportRecord(categoryReport: CategoryReport[], x: Receipt) {
        const existingCategory = categoryReport.filter(y => y.category === x.category);
        if (existingCategory && existingCategory.length > 0) {
            existingCategory[0].count++;
        } else {
            const category: CategoryReport = {
                category: x.category,
                count: 1
            };
            categoryReport.push(category);
        }
    }

    private generateReceiptReportRecord(x: Receipt, totalCosts: number, receiptsReports: ReceiptReport[]) {
        const percent = ((x.cost / totalCosts) * 100);
        const percentTwoDecimals = Math.round(percent * 100) / 100;
        const receiptReport: ReceiptReport = {
            ...x,
            costPercentage: percentTwoDecimals
        };
        receiptsReports.push(receiptReport);
    }

    private async saveCsv(path: string, payload: any) {
        const csv = new ObjectsToCsv(payload);
        await csv.toDisk(path);
    }
}