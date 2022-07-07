import * as bcrypt from 'bcryptjs';
import { readFile } from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import IUser from '../database/models/interfaces/IUser';

const encryptPassword = async (password: string): Promise<string> => {
  const SALT = 10;
  const cryptedPassword = await bcrypt.hash(password, SALT);

  return cryptedPassword;
};

const checkIsValidPassword = async (password: string, hash: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, hash);

  return isValid;
};

const readFileFrom = async (path: string) => {
  try {
    const content = await readFile(path, 'utf-8');
    return content;
  } catch (error) {
    console.log(error);
  }
};

const getSecret = async () => {
  try {
    const secret = await readFileFrom('./jwt.evaluation.key');
    return secret?.trim();
  } catch (error) {
    console.log(error);
  }
};

const generateToken = async (user: IUser) => {
  const secret = await getSecret();

  if (!secret) throw new Error('Authentication failed!');

  const token = jwt.sign(user, secret);

  return token;
};

export {
  encryptPassword,
  checkIsValidPassword,
  generateToken,
};
