import { Tier } from "./tier";

export interface ISignIn {
  email: string;
  password: string;
}

export interface IResSignIn {
  userId: string;
  email: string;
  tier: Tier;
  tokens: number;
  access_token: string;
}

export interface IGetProfile {
  userId: string;
  email: string;
  tier: Tier;
  tokens: number;
}