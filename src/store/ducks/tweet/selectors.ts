import { TweetState, LoadingState } from './contracts/state';

interface RootState {
  tweet: {
    data: TweetState['data'];
    loadingState: LoadingState;
  };
}

export const selectTweet = (state: RootState) => state.tweet;

export const selectTweetData = (state: RootState) => state.tweet.data;

export const selectTweetLike = (state: RootState) => state.tweet.data?.liked;

export const selectTweetLoadingState = (state: RootState) => state.tweet.loadingState;
