import produce, { current, Draft } from 'immer';
import { TweetsActions, TweetsActionsType } from './actionCreators';
import { TweetsState, LoadingState } from './contracts/state';

const initialTweetsState: TweetsState = {
  items: [],
  loadingState: LoadingState.NEVER,
  addedTweetLoadingState: LoadingState.NEVER,
};

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {
  switch (action.type) {
    case TweetsActionsType.SET_TWEETS:
      draft.items = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;
    case TweetsActionsType.FETCH_TWEETS:
      draft.items = [];
      draft.loadingState = LoadingState.LOADING;
      break;
    case TweetsActionsType.SET_LOADING_STATE:
      draft.loadingState = action.payload;
      break;
    case TweetsActionsType.APPEND_ADDED_TWEET:
      draft.items = [action.payload, ...draft.items];
      draft.addedTweetLoadingState = LoadingState.LOADED;
      break;
    case TweetsActionsType.SET_ADD_TWEE_LOADING_STATE:
      draft.addedTweetLoadingState = action.payload;
      break;
    case TweetsActionsType.LIKE_TWEET_IN_LIST:
      const currentData = current(draft.items);
      const newData = [...currentData];
      newData[action.payload.key] = {
        ...currentData[action.payload.key],
        liked: action.payload.isLike,
      };
      draft.items = newData;
      break;
    default:
      break;
  }
}, initialTweetsState);
