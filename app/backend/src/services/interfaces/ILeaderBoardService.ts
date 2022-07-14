import ILeaderBoard from '../../interfaces/ILeaderBoard';

export default interface ILeaderBoardService {
  findAll(path: string): Promise<Array<ILeaderBoard> | null>;
}
