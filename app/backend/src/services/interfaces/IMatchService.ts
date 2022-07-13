import IMatch from '../../database/models/interfaces/IMatch';

export default interface IMatchService {
  findAll(): Promise<Array<IMatch> | null>;
}
