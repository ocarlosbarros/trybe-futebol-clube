export default interface IModel<T> {
  create(): Promise<T>;
  findAll(): Promise<T>;
  findOne(filter: string): Promise<T>;
  findByPk(id: number): Promise<T>;
  update(entity:T): Promise<T>;
  destroy(id:number): Promise<void>;
}
