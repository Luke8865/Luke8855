
export interface GameItem {
  id: string;
  name: string;
  level: number;
  category: 'Dog' | 'Booster';
  price: number;
  currency: 'Gold' | 'Gems' | 'USD' | 'SPICE';
  image: string;
  description: string;
}

export interface User {
  username: string;
  level: number;
  exp: number;
  maxExp: number;
  gems: number;
  gold: number;
  spice: number;
  dogsCount: number;
  isLoggedIn: boolean;
}

export enum MarketTab {
  ALL = 'All',
  DOGS = 'Dogs',
  BOOSTERS = 'Boosters'
}

export type Language = 'EN' | 'ZH' | 'JP' | 'KR';
