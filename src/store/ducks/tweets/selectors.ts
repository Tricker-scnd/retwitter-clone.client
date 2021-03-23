import { TweetsState, LoadingState } from './contracts/state';

interface RootState {
  tweets: {
    items: TweetsState['items'];
    loadingState: LoadingState;
  };
}

export const selectTweets = (state: RootState) => state.tweets;

export const selectTweetsItems = (state: RootState) => state.tweets.items;

export const selectLoadingState = (state: RootState) => state.tweets.loadingState;
