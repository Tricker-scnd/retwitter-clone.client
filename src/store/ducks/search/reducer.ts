import produce, { Draft } from 'immer';
import { SearchActions, SearchActionsType } from './actionCreators';
import { LoadingState, SearchContentState } from './contracts/state';

const initialSearchResultState: SearchContentState = {
  items: [],
  loadingState: LoadingState.NEVER,
};

export const SearchReducer = produce((draft: Draft<SearchContentState>, action: SearchActions) => {
  switch (action.type) {
    case SearchActionsType.SET_SEARCH_RESULT:
      draft.items = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;
    case SearchActionsType.SET_SEARCH_STATUS:
      draft.loadingState = action.payload;
      break;
    case SearchActionsType.RESET_SEARCH:
      draft.items = [];
      draft.loadingState = LoadingState.NEVER;
      break;
    default:
      break;
  }
}, initialSearchResultState);
