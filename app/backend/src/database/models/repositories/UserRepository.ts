import IUser from '../interfaces/IUser';
import IUserRepository from './interfaces/IUserRepository';
import User from '../User';

class UserRepository implements IUserRepository {
  private _model;

  constructor() {
    this._model = User;
  }

  async findBy(email: string): Promise<IUser> {
    const founded = await this._model.findOne({ where: { email }, raw: true });
    return founded as IUser;
  }
}

export default UserRepository;
