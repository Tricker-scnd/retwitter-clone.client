import produce, { Draft } from 'immer';
import { ActualThemesActions, ActualThemesActionsType } from './actionCreators';
import { ActualThemesState, LoadingState } from './contracts/state';

const initialActualThemesState: ActualThemesState = {
  items: [],
  loadingState: LoadingState.NEVER,
};

export const ActualThemesReducer = produce((draft: Draft<ActualThemesState>, action: ActualThemesActions) => {
  switch (action.type) {
    case ActualThemesActionsType.SET_ITEMS:
      draft.items = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;
    case ActualThemesActionsType.FETCH_ITEMS:
      draft.items = []
      draft.loadingState = LoadingState.LOADING;
      break;
    case ActualThemesActionsType.SET_LOADING_STATE:
      draft.loadingState = action.payload;
      break;
    default:
      break;
  }
}, initialActualThemesState);
