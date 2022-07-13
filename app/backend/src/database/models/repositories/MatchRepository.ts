import IMatch from '../interfaces/IMatch';
import Match from '../Match';
import Team from '../Team';
import IMatchRepository from './interfaces/IMatchRepository';

class MatchRepository implements IMatchRepository {
  private _model;

  constructor() {
    this._model = Match;
  }

  async findById(id: number): Promise<IMatch | null> {
    const founded = await this._model.findByPk(id, { raw: true });
    if (!founded) return null;

    return founded;
  }

  async patch(match: IMatch): Promise<number> {
    const { id } = match;
    const [updatedRows] = await this._model.update(match, {
      where: { id },
    });
    return updatedRows;
  }

  async create(match: IMatch): Promise<IMatch> {
    const created = await this._model.create(match);
    return created;
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
