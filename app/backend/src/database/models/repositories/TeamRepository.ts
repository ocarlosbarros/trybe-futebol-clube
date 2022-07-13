import ITeamRepository from './interfaces/ITeamRepository';
import ITeam from '../interfaces/ITeam';
import Team from '../Team';

class TeamRepository implements ITeamRepository {
  private _model;

  constructor() {
    this._model = Team;
  }

  async findAll(): Promise<Array<ITeam>> {
    const allTeams = await this._model.findAll();
    return allTeams;
  }
}

export default TeamRepository;
