import IMatch from '../../database/models/interfaces/IMatch';

export default interface IMatchService {
  findAll(): Promise<Array<IMatch> | null>;
  create(match: IMatch): Promise<IMatch>;
  patch(id: number): Promise<number | null>;
}
