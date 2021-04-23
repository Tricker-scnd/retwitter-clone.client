import { Action } from 'redux';
import { AddTweetState, LoadingState, Tweet, TweetsState } from './contracts/state';

export enum TweetsActionsType {
  SET_TWEETS = 'tweets/SET_TWEETS',
  FETCH_TWEETS = 'tweets/FETCH_TWEETS',
  SET_LOADING_STATE = 'tweets/SET_LOADING_STATE',
  ADD_TWEET = 'tweets/ADD_TWEET',
  APPEND_ADDED_TWEET = 'tweets/APPEND_ADDED_TWEET',
  SET_ADD_TWEE_LOADING_STATE = 'tweets/SET_ADD_TWEE_LOADING_STATE',
  LIKE_TWEET_IN_LIST = 'tweets/LIKE_TWEET_IN_LIST',
}

export interface SetTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_TWEETS;
  payload: TweetsState['items'];
}
export interface FetchTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_TWEETS;
}
export interface SetTweetsLoadingActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}
export interface SetAddTweetLoadingActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_ADD_TWEE_LOADING_STATE;
  payload: LoadingState;
}
export interface AppendAddedTweetActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.APPEND_ADDED_TWEET;
  payload: Tweet;
}
export interface AddTweetActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.ADD_TWEET;
  payload: AddTweetState;
}
export interface LikeTweetInListActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.LIKE_TWEET_IN_LIST;
  payload: {
    key: number;
    isLike: boolean;
  };
}

export const setTweets = (payload: TweetsState['items']): SetTweetsActionInterface => ({
  type: TweetsActionsType.SET_TWEETS,
  payload,
});

export const setTweetsLoading = (payload: LoadingState): SetTweetsLoadingActionInterface => ({
  type: TweetsActionsType.SET_LOADING_STATE,
  payload,
});
export const fetchTweets = (): FetchTweetsActionInterface => ({
  type: TweetsActionsType.FETCH_TWEETS,
});

export const setAddTweetLoading = (payload: LoadingState): SetAddTweetLoadingActionInterface => ({
  type: TweetsActionsType.SET_ADD_TWEE_LOADING_STATE,
  payload,
});
export const apppendAddedTweet = (payload: Tweet): AppendAddedTweetActionInterface => ({
  type: TweetsActionsType.APPEND_ADDED_TWEET,
  payload,
});
export const addTweet = (payload: AddTweetState): AddTweetActionInterface => ({
  type: TweetsActionsType.ADD_TWEET,
  payload,
});
export const likeTweetInList = (
  key: LikeTweetInListActionInterface['payload']['key'],
  isLike: LikeTweetInListActionInterface['payload']['isLike'],
): LikeTweetInListActionInterface => ({
  type: TweetsActionsType.LIKE_TWEET_IN_LIST,
  payload: {
    key,
    isLike,
  },
});

export type TweetsActions =
  | SetTweetsActionInterface
  | SetTweetsLoadingActionInterface
  | FetchTweetsActionInterface
  | SetAddTweetLoadingActionInterface
  | AddTweetActionInterface
  | AppendAddedTweetActionInterface
  | LikeTweetInListActionInterface;
