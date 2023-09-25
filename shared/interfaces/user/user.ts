export interface IUser {
  email: string;
  password: string;
  username: string;
  creationDate: Date;
  loginByGoogle: boolean;
  emailVerified: boolean;
  emailVerificationToken?: string;
  tokens: number;
  tier: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  username: string;
}