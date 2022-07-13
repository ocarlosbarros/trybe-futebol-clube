import IMatch from '../../database/models/interfaces/IMatch';
import ITeamGoals from '../../interfaces/ITeamGoals';

export default interface IMatchService {
  findAll(): Promise<Array<IMatch> | null>;
  create(match: IMatch): Promise<IMatch>;
  patch(id: number): Promise<number | null>;
  update(id: number, teamGoals: ITeamGoals): Promise<number | null>;
}
