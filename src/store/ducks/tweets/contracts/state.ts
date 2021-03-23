export enum LoadingState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface Tweet {
  _id: string;
  text: string;
  user: {
    userName: string;
    login: string;
    avatarUrl: string;
    verify: boolean;
  };
}

export interface TweetsState {
  items: Tweet[];
  loadingState: LoadingState;
}
