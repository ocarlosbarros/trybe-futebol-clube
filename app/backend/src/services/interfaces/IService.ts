export default interface IService<T> {
  create(): Promise<T>;
  findAll(): Promise<T>;
  findById(id: number): Promise<T>;
  update(entity:T): Promise<T>;
  delete(id:number): Promise<void>;
}
