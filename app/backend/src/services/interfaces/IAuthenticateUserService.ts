import IUser from '../../database/models/interfaces/IUser';

export default interface IAuthenticateUserService {
  execute(email:string, password:string):Promise<IUser>
}
