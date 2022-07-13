import ITeam from '../../database/models/interfaces/ITeam';

export default interface ITeamService {
  findAll(): Promise<Array<ITeam> | null>;
}
