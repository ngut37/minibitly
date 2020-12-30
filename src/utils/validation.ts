import { genSalt, hash } from 'bcrypt';

type SaltAndPassword = {
  salt: string,
  password: string,
}

export const generateSaltAndPassword = async (plainPassword: string): Promise<SaltAndPassword> => {
  const salt = await genSalt();
  const password = await hash(plainPassword, salt);
  return {
    salt,
    password,
  }
};

export const validatePassword = async (saltAndPassword: SaltAndPassword, hashedPassword: string): Promise<boolean> => {
  const { salt, password } = saltAndPassword;
  const generatedPassword = await hash(password, salt);
  return generatedPassword === hashedPassword;
}