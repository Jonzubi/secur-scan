import * as bcrypt from 'bcrypt';

export const hashPassword = (rawPassword: string): string => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, salt);
};

export const comparePassword = (rawPassword: string, hash: string): boolean => {
  const isMatch = bcrypt.compareSync(rawPassword, hash);
  return isMatch;
};

export const randomPassword = () => Math.random().toString(36).slice(2);