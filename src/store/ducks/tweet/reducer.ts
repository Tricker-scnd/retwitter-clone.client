import produce, { Draft } from 'immer';
import { TweetActions, TweetActionsType } from './actionCreators';
import { TweetState, LoadingState } from './contracts/state';

const initialTweetState: TweetState = {
  data: undefined,
  loadingState: LoadingState.NEVER,
};

export const tweetReducer = produce((draft: Draft<TweetState>, action: TweetActions) => {
  switch (action.type) {
    case TweetActionsType.SET_TWEET_DATA:
      draft.data = action.payload;
      draft.loadingState = action.payload ? LoadingState.LOADED : LoadingState.NEVER;
      break;
    case TweetActionsType.FETCH_TWEET_DATA:
      draft.data = undefined;
      draft.loadingState = LoadingState.LOADING;
      break;
    case TweetActionsType.SET_LOADING_STATE:
      draft.loadingState = action.payload;
      break;
    case TweetActionsType.SET_LIKE:
      draft.data!.liked = action.payload;
      break;
    default:
      break;
  }
}, initialTweetState);
