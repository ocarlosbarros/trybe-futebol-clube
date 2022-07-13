import ITeam from '../../interfaces/ITeam';

export default interface ITeamRepository {
  findAll():Promise<Array<ITeam> | null>
  findById(id: number):Promise<ITeam | null>

}
