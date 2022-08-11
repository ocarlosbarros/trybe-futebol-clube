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

  public findById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const founded = await this._teamService.findById(+id);

      if (!founded) return response.status(404).json({ message: 'Team not found!' });

      return response.status(200).json(founded);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
