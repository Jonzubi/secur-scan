export interface User {
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

export interface createUser {
  email: string;
  password: string;
  username: string;
}