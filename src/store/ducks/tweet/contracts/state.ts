import { Tweet } from '../../tweets/contracts/state';

export enum LoadingState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}
export enum pinState {
  PIN = 'PIN',
  UNPIN = 'UNPIN',
}

export interface TweetState {
  data: Tweet | undefined;
  loadingState: LoadingState;
}

export interface TweetFetchResult {
  status: string;
  data: Tweet;
}
