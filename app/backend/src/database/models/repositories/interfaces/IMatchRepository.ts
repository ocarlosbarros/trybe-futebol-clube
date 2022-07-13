import IMatch from '../../interfaces/IMatch';

export default interface IMatchRepository {
  findAll():Promise<Array<IMatch> | null>
  create(match: IMatch):Promise<IMatch>
  patch(match: IMatch):Promise<number>
  findById(id: number):Promise<IMatch | null>
  update(match: IMatch):Promise<number>
}
