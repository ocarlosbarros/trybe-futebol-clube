import { Op } from 'sequelize';
import IRepository from './IRepository';
import IUser from '../interfaces/IUser';
import IUserRepository from './IUserRepository';
import User from '../User';

abstract class UserRepository implements IUserRepository {
  private _model;

  constructor() {
    this._model = User;
  }

  async findBy(email: string): Promise<IUser> {
    const founded = await this._model.findOne({ where: { email } });
    return founded as IUser;
  }
}

export default UserRepository;
