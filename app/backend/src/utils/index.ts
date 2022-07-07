import * as bcrypt from 'bcryptjs';

const encryptPassword = async (password: string): Promise<string> => {
  const SALT = 10;
  const cryptedPassword = await bcrypt.hash(password, SALT);

  return cryptedPassword;
};

const checkIsValidPassword = async (password: string, hash: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, hash);

  return isValid;
};

export {
  encryptPassword,
  checkIsValidPassword,
};
