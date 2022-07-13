import ITeam from '../database/models/interfaces/ITeam';
import ITeamRepository from '../database/models/repositories/interfaces/ITeamRepository';
import ITeamService from './interfaces/ITeamService';

class TeamService implements ITeamService {
  private _teamRepository;

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository;
  }

  public async findAll(): Promise<Array<ITeam> | null> {
    const allTeams = await this._teamRepository.findAll();
    if (!allTeams) return null;
    return allTeams;
  }
}
export default TeamService;
