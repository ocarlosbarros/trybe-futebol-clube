import ITeam from '../../interfaces/ITeam';

export default interface ITeamRepository {
  findAll():Promise<Array<ITeam> | null>
}
