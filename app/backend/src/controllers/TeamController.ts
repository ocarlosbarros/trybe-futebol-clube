import { NextFunction, Request, Response } from 'express';
import ITeamService from '../services/interfaces/ITeamService';

class TeamController {
  private _teamService;

  constructor(teamService: ITeamService) {
    this._teamService = teamService;
  }

  public findAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const allTeams = await this._teamService.findAll();
      return response.status(200).json(allTeams);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
