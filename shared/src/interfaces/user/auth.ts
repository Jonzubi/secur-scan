import { Tier } from "./tier";

export interface ISignIn {
  email: string;
  password: string;
}

export interface IGetProfile {
  email: string;
  tier: Tier;
  tokens: number;
}