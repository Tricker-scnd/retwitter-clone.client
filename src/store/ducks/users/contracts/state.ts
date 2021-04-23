import { Tweet } from '../../tweets/contracts/state';

export enum SpecialUserLoadingState {
  NEVER = 'NEVER',
  LOADED = 'LOADED',
  LOADING = 'LOADING',
}

export interface SpecialUser {
  _id?: string;
  confirmed?: boolean;
  verified?: boolean;
  avatarSrc: string;
  email?: string;
  fullname: string;
  login: string;
  registerDate?: string;
  about?: string;
  subscribers?: string[];
  subscriptions?: string[];
  subCount?: number;
  likes?: string[];
  pinnedTweet?: string;
}

export interface SpecialUserState {
  status: SpecialUserLoadingState;
  user: SpecialUser | null;
  userTweets: Tweet[] | null;
}

export interface FetchSpecialUserState {
  status: SpecialUserLoadingState;
  data: {
    user: SpecialUserState['user'];
  };
}

export interface fetchSubscribeResult {
  status: string;
}
// export interface FetchSpecialUserTweetsState {
//   status: SpecialUserLoadingState;
//   data: Tweet[];
// }
