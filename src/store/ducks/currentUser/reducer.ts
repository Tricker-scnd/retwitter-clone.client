import produce, { Draft } from 'immer';
import { CurrentUserActions, CurrentUserActionType } from './actionCreators';
import { AuthorizeResultState, AuthorizeState } from './contracts/state';

const initialCurrentUserState: AuthorizeState = {
  status: AuthorizeResultState.NEVER,
  data: null,
  subscribers: [],
  subscriptions: [],
};

export const CurrentUserReducer = produce(
  (draft: Draft<AuthorizeState>, action: CurrentUserActions) => {
    switch (action.type) {
      case CurrentUserActionType.SET_USER_INFO:
        draft.status = action.payload.status;
        draft.data = action.payload.data || null;
        break;
      case CurrentUserActionType.SET_AUTHORIZE_STATUS:
        draft.status = action.payload;
        break;
      case CurrentUserActionType.CHANGE_AUTHORIZE_STATUS:
        draft.status = action.payload;
        break;
      case CurrentUserActionType.LOG_OUT:
        draft.status = AuthorizeResultState.UNSIGNED;
        draft.data = initialCurrentUserState.data;
        break;
      case CurrentUserActionType.SET_SUBS:
        draft.subscribers = action.payload;
        break;
      case CurrentUserActionType.SET_SUBSCRIPTIONS:
        draft.subscriptions = action.payload;
        break;
      default:
        break;
    }
  },
  initialCurrentUserState,
);
