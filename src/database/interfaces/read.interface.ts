export interface Read<T> {
  findAll(): Promise<T[]>;
  findOneById(id: string): Promise<T>;
}
