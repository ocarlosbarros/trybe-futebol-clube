import { checkIsValidPassword } from '../utils';
import IUserRepository from '../database/models/repositories/IUserRepository';

class AuthenticateUser {
  private _userRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  public async execute(email: string, password:string) {
    const founded = await this._userRepository.findBy(email);

    if (!founded) throw new Error('User not found');

    const isValidPassword = await checkIsValidPassword(password, founded.password);

    if (!isValidPassword) throw new Error('Password is invalid');

    return founded;
  }
}

export default AuthenticateUser;
