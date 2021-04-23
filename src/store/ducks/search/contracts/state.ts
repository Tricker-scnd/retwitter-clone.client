import { Tweet } from '../../tweets/contracts/state';

export enum LoadingState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}
export enum fetchStatusState {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface SearchContent {
  items: Tweet[];
}

export interface SearchContentState {
  loadingState: LoadingState;
  items: SearchContent['items'];
}

export interface SearchContentFetchResult {
  status: fetchStatusState;
  data: SearchContent['items'];
}
