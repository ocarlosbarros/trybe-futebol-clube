import IMatch from '../../interfaces/IMatch';

export default interface IMatchRepository {
  findAll():Promise<Array<IMatch> | null>
}
