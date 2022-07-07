import { checkIsValidPassword, generateToken } from '../utils';
import IUserRepository from '../database/models/repositories/IUserRepository';
import IAuthenticateUserService from './interfaces/IAuthenticateUserService';
import IUser from '../database/models/interfaces/IUser';

class AuthenticateUserService implements IAuthenticateUserService {
  private _userRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  public async execute(email: string, password:string) {
    const founded = await this._userRepository.findBy(email) as IUser;
    const error = new Error('Incorrect email or password');
    error.name = 'Unauthorized';

    if (!founded) throw error;

    const { password: hash } = founded;

    const isValidPassword = await checkIsValidPassword(password, hash);

    if (!isValidPassword) throw error;

    const token = await generateToken(founded);

    return token;
  }
}

export default AuthenticateUserService;
