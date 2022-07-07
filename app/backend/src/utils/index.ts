import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import IUser from '../database/models/interfaces/IUser';

const SECRET = process.env.jwt_secret || 'jwt_secret';

const encryptPassword = async (password: string): Promise<string> => {
  const SALT = 10;
  const cryptedPassword = await bcrypt.hash(password, SALT);

  return cryptedPassword;
};

const checkIsValidPassword = async (password: string, hash = ''): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, hash);

  return isValid;
};

const generateToken = async (user: IUser) => {
  const { id, username, email, role } = user;

  const token = jwt.sign({ id, username, email, role }, SECRET);

  return token;
};

export {
  encryptPassword,
  checkIsValidPassword,
  generateToken,
};
