import { LoadingState, Tweet } from './contracts/state';

interface RootState {
  favorite: {
    items: Tweet[];
    loadingState: LoadingState;
  };
}

export const selectFavoriteState = (state: RootState) => state.favorite;

export const selectFavoriteItems = (state: RootState) => state.favorite.items;

export const selectFavoriteLoadingState = (state: RootState) => state.favorite.loadingState;
