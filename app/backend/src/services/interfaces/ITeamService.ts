import ITeam from '../../database/models/interfaces/ITeam';

export default interface ITeamService {
  findAll(): Promise<Array<ITeam> | null>;
  findById(id: number): Promise<ITeam | null>;
}
