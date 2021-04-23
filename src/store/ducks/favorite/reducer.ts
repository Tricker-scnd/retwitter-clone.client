import produce, { current, Draft } from 'immer';
import { TweetsActions, TweetsActionsType } from './actionCreators';
import { TweetsState, LoadingState } from './contracts/state';

const initialFavoriteState: TweetsState = {
  items: [],
  loadingState: LoadingState.NEVER,
};

export const FavoritesReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {
  switch (action.type) {
    case TweetsActionsType.SET_FAVORITE_TWEETS:
      draft.items = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;
    case TweetsActionsType.SET_LOADING_STATE:
      draft.loadingState = action.payload;
      break;
    default:
      break;
  }
}, initialFavoriteState);
