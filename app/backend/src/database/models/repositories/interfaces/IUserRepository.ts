import IUser from '../../interfaces/IUser';

export default interface IUserRepository {
  findBy(email: string):Promise<IUser | null>
}
