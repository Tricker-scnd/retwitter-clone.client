import { SearchContentState, LoadingState } from './contracts/state';

interface RootState {
  search: {
    items: SearchContentState['items'];
    loadingState: LoadingState;
  };
}

export const selectSearchState = (state: RootState) => state.search;

export const selectSearchResultItems = (state: RootState) => state.search.items;

export const selectSearchLoadingState = (state: RootState) => state.search.loadingState;
