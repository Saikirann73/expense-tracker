import { ObjectId } from "mongodb";

export interface Write<T> {
  create(item: T | any): Promise<ObjectId>;
  deleteMany(filter: any): Promise<boolean>;
}
