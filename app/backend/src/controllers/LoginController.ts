import { NextFunction, Request, Response } from 'express';
import IRequest from '../@types/IRequest';
import IAuthenticateUserService from '../services/interfaces/IAuthenticateUserService';
import IUser from '../database/models/interfaces/IUser';

class LoginController {
  private _authenticateUserService;

  constructor(authenticateUserService: IAuthenticateUserService) {
    this._authenticateUserService = authenticateUserService;
  }

  public execute = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, password } = request.body;
      const token = await this._authenticateUserService.execute(email, password);
      return response.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public validate = async (request: IRequest, response: Response, next: NextFunction) => {
    try {
      const { role } = request.user as IUser;
      return response.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
