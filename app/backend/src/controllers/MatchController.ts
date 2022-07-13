import { NextFunction, Request, Response } from 'express';
import IMatchService from '../services/interfaces/IMatchService';

class MatchController {
  private _matchService;

  constructor(matchService: IMatchService) {
    this._matchService = matchService;
  }

  public findAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const allMatches = await this._matchService.findAll();
      return response.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
