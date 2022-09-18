import { Inject, Injectable } from '@nestjs/common'
import { Db } from 'mongodb'
import { Receipt } from './../../receipts/entities/receipt.entity'
import { BaseRepository } from './base-repository'


@Injectable()
export class ReceiptsRepository extends BaseRepository<Receipt> {
  constructor(
    @Inject('DATABASE_CONNECTION')
    db: Db
  ) {
    super(Receipt, db, 'receipts')
  }

  async aggregation(pipeline: any[], options?: any): Promise<any> {
    const result = await this._collection.aggregate(pipeline, options).toArray()
    return result
  }
}
