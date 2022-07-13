import IMatch from '../interfaces/IMatch';
import Match from '../Match';
import IMatchRepository from './interfaces/IMatchRepository';

class MatchRepository implements IMatchRepository {
  private _model;

  constructor() {
    this._model = Match;
  }

  async findAll(): Promise<Array<IMatch>> {
    const allMatches = await this._model.findAll();
    return allMatches;
  }
}

export default MatchRepository;
