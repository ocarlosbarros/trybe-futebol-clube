import { checkIsValidPassword, generateToken } from '../utils';
import IUserRepository from '../database/models/repositories/IUserRepository';
import IAuthenticateUserService from './interfaces/IAuthenticateUserService';

class AuthenticateUserService implements IAuthenticateUserService {
  private _userRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  public async execute(email: string, password:string) {
    const founded = await this._userRepository.findBy(email);

    if (!founded) throw new Error('User not found');

    const isValidPassword = await checkIsValidPassword(password, founded.password);
    console.log(isValidPassword);

    if (!isValidPassword) throw new Error('Password is invalid');

    const token = await generateToken(founded);
    return token;
  }
}

export default AuthenticateUserService;
