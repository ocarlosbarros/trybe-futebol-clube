import IMatch from '../interfaces/IMatch';
import Match from '../Match';
import Team from '../Team';
import IMatchRepository from './interfaces/IMatchRepository';

class MatchRepository implements IMatchRepository {
  private _model;

  constructor() {
    this._model = Match;
  }

  async findAll(): Promise<Array<IMatch>> {
    const allMatches = await this._model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }
}

export default MatchRepository;
