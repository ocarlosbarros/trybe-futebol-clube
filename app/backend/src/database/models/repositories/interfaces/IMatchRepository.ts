import IMatch from '../../interfaces/IMatch';

export default interface IMatchRepository {
  findAll():Promise<Array<IMatch> | null>
  create(match: IMatch):Promise<IMatch>
}
