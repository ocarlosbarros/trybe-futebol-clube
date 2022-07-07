import { Request } from 'express';
import IUser from '../database/models/interfaces/IUser';

interface IRequest extends Request{
  user?:IUser
  authorization?:string
}

export default IRequest;
