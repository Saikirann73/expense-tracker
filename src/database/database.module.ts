import { Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ReceiptsRepository } from './repositories/receipts-repository';

@Module({
  imports: [ConfigurationModule],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      inject: ['Application_Config'],
      useFactory: async (applicationConfig: any): Promise<Db> => {
        try {
          const client: MongoClient = await intitializaMongoClient(applicationConfig);
          const db: Db = client.db("expensetracker");
          return db;
        } catch (e) {
          console.log(e)
          throw e;
        }
      },
    },
    ReceiptsRepository,
  ],
  exports: [
    ReceiptsRepository,
  ],
})
export class DatabaseModule { }

async function intitializaMongoClient(applicationConfig: any) {
  const client: MongoClient = await new MongoClient(applicationConfig.mongoDbConnectionString, {
    monitorCommands: true
  }).connect();
  return client;
}
