import { NextFunction, Request, Response } from 'express';
import ILeaderBoardService from '../services/interfaces/ILeaderBoardService';

class LeaderBoardController {
  private _leaderBoardService;

  constructor(leaderBoardService: ILeaderBoardService) {
    this._leaderBoardService = leaderBoardService;
  }

  public findAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { path } = request;
      const leaderBoard = await this._leaderBoardService.findAll(path);
      return response.status(200).json(leaderBoard);
    } catch (error) {
      next(error);
    }
  };
}

export default LeaderBoardController;
