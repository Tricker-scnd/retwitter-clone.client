import produce, { Draft } from 'immer';
import { UsersActionType, SpecialUserActions } from './actionCreators';
import { SpecialUserLoadingState, SpecialUserState } from './contracts/state';

const initialSpecialUserState: SpecialUserState = {
  status: SpecialUserLoadingState.NEVER,
  user: null,
  userTweets: [],
};

export const SpecialUserReducer = produce(
  (draft: Draft<SpecialUserState>, action: SpecialUserActions) => {
    switch (action.type) {
      case UsersActionType.SET_USER_PROFILE:
        draft.status = SpecialUserLoadingState.LOADED;
        draft.user = action.payload || null;
        break;
      case UsersActionType.SET_LOADING_USER_PROFILE_STATUS:
        draft.status = action.payload;
        break;
      case UsersActionType.SET_USER_TWEETS:
        draft.userTweets = action.payload;
        break;
      default:
        break;
    }
  },
  initialSpecialUserState,
);
