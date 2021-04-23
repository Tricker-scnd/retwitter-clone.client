import { LoadingState, Tweet } from './contracts/state';

interface RootState {
  tweets: {
    items: Tweet[];
    loadingState: LoadingState;
    addedTweetLoadingState: LoadingState;
  };
}

export const selectTweets = (state: RootState) => state.tweets;

export const selectTweetsItems = (state: RootState) => state.tweets.items;

export const selectLoadingState = (state: RootState) => state.tweets.loadingState;

export const selectAddTweetLoadingState = (state: RootState) => state.tweets.addedTweetLoadingState;
