export enum LoadingState {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface ActualTheme {
  _id: string;
  tag: string;
  name: string;
  tweetsCount: number;
}

export interface ActualThemesState {
  items: ActualTheme[];
  loadingState: LoadingState;
}

export interface ActualThemesFetchResult {
  status: String;
  data: ActualTheme[];
}
