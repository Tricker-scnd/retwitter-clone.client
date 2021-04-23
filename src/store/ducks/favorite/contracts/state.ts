export enum LoadingState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface Tweet {
  _id: string;
  text: string;
  images?: string[];
  user: {
    userName: string;
    login: string;
    avatarSrc: string;
    verified: boolean;
  };
  tags?: string[];
  publishedDate?: string;
  liked?: boolean;
  likesCount?: number;
}

export interface TweetsState {
  items: Tweet[];
  loadingState: LoadingState;
}
export interface TweetsFetchResult {
  status: string;
  data: Tweet[];
}
