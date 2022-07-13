import IMatch from '../database/models/interfaces/IMatch';
import IMatchRepository from '../database/models/repositories/interfaces/IMatchRepository';
import IMatchService from './interfaces/IMatchService';

class MatchService implements IMatchService {
  private _matchRepository;

  constructor(matchRepository: IMatchRepository) {
    this._matchRepository = matchRepository;
  }

  public async findAll(): Promise<Array<IMatch> | null> {
    const allMatches = await this._matchRepository.findAll();
    if (!allMatches) return null;
    return allMatches;
  }
}
export default MatchService;
