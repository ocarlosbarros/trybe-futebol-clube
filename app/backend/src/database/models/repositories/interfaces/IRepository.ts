export default interface IRepository<T> {
  create(): Promise<T>;
  findAll(): Promise<T>;
  findById(id: number): Promise<T>;
  update(entity:T): Promise<T>;
  destroy(id:number): Promise<void>;
}
