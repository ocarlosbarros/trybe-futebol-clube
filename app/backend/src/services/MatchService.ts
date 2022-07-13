import ITeamGoals from '../interfaces/ITeamGoals';
import IMatch from '../database/models/interfaces/IMatch';
import IMatchRepository from '../database/models/repositories/interfaces/IMatchRepository';
import IMatchService from './interfaces/IMatchService';

class MatchService implements IMatchService {
  private _matchRepository;

  constructor(matchRepository: IMatchRepository) {
    this._matchRepository = matchRepository;
  }

  public async update(id: number, teamGoals: ITeamGoals): Promise<number | null> {
    const founded = await this._matchRepository.findById(id);

    if (!founded) return null;

    const updatedMatch = { ...founded, ...teamGoals };

    const updated = await this._matchRepository.update(updatedMatch);

    return updated;
  }

  public async patch(id: number): Promise<number | null> {
    const inProgress = false;
    const founded = await this._matchRepository.findById(id);

    if (!founded) return null;

    const isUpdated = this._matchRepository.patch({ ...founded, inProgress });
    return isUpdated;
  }

  public async create(match: IMatch): Promise<IMatch> {
    const inProgress = true;
    const created = await this._matchRepository.create({ ...match, inProgress });
    return created;
  }

  public async findAll(): Promise<Array<IMatch> | null> {
    const allMatches = await this._matchRepository.findAll();
    if (!allMatches) return null;
    return allMatches;
  }
}
export default MatchService;
