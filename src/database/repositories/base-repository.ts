import { plainToClass, plainToInstance } from 'class-transformer'
import { Collection, Db, InsertOneResult, BulkWriteResult, ReturnDocument, ObjectId } from 'mongodb'
import { Read } from '../interfaces/read.interface'
import { Write } from '../interfaces/write.interface'
export abstract class BaseRepository<T> implements Write<T>, Read<T> {
  public readonly _collection: Collection

  constructor(protected classToTransform: any, db: Db, collectionName: string) {
    this._collection = db.collection(collectionName)
  }

  async findAll(): Promise<T[]> {
    const result = await this._collection.find().toArray()
    return plainToInstance(this.classToTransform, result)
  }

  async findOneById(id): Promise<T> {
    const filterDefinition = {
      _id: id,
    }
    const result = await this._collection.findOne(filterDefinition)
    return plainToClass(this.classToTransform, result)
  }

  async create(item: T): Promise<ObjectId> {
    const result: InsertOneResult = await this._collection.insertOne(item)
    return result.insertedId
  }

  async deleteMany(filter: any): Promise<boolean> {
    const result = await this._collection.deleteMany(filter)
    return result.acknowledged
  }
}

