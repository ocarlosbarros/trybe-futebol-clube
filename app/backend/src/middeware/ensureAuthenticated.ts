import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import IRequest from '../@types/IRequest';
import IUser from '../database/models/interfaces/IUser';

const SECRET = process.env.jwt_secret || 'jwt_secret';

const ensureAuthenticated = async (request: IRequest, response:Response, next: NextFunction) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) return response.status(401).json({ message: 'Token not found' });

    const { password, ...user } = jwt.verify(authorization, SECRET) as IUser;
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default ensureAuthenticated;
