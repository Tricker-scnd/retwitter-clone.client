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
  pinned?: boolean;
}

export interface TweetsState {
  items: Tweet[];
  loadingState: LoadingState;
  addedTweetLoadingState?: LoadingState;
}

export interface AddTweetState {
  text?: string | undefined | null;
  images?: any;
}

export interface AddedTweetState {
  status: string;
  data: Tweet;
}

export interface TweetsFetchResult {
  status: string;
  data: Tweet[];
}
