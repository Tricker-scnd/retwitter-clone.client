import { Action } from 'redux';
import { LoadingState, TweetState } from './contracts/state';

export enum TweetActionsType {
  SET_TWEET_DATA = 'tweet/SET_TWEET_DATA',
  DELETE_TWEET = 'tweet/DELETE_TWEET',
  FETCH_TWEET_DATA = 'tweet/FETCH_TWEET_DATA',
  SET_LOADING_STATE = 'tweet/SET_LOADING_STATE',

  SET_LIKE_REQUEST = 'tweets/SET_LIKE_REQUEST',
  SET_LIKE = 'tweets/SET_LIKE',

  PIN_TWEET = 'tweets/PIN_TWEET'
}

export interface SetTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_TWEET_DATA;
  payload: TweetState['data'];
}
export interface FetchTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.FETCH_TWEET_DATA;
  payload: string;
}
export interface SetTweetLoadingActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}
export interface DeleteTweetActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.DELETE_TWEET;
  payload: string;
}
export interface SetLikeRequestActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_LIKE_REQUEST;
  payload: {
    id: string;
    isLike: boolean;
    inList?: boolean;
  };
}
export interface SetLikeActionInterface extends Action<TweetActionsType> {
  type: TweetActionsType.SET_LIKE;
  payload: boolean;
}

export const setTweet = (payload: TweetState['data']): SetTweetActionInterface => ({
  type: TweetActionsType.SET_TWEET_DATA,
  payload,
});
export const setTweetLoading = (payload: LoadingState): SetTweetLoadingActionInterface => ({
  type: TweetActionsType.SET_LOADING_STATE,
  payload,
});
export const fetchTweet = (payload: string): FetchTweetActionInterface => ({
  type: TweetActionsType.FETCH_TWEET_DATA,
  payload,
});
export const deleteTweet = (payload: string): DeleteTweetActionInterface => ({
  type: TweetActionsType.DELETE_TWEET,
  payload,
});
export const setLikeRequest = (
  id: string,
  isLike: boolean,
  inList?: boolean,
): SetLikeRequestActionInterface => ({
  type: TweetActionsType.SET_LIKE_REQUEST,
  payload: { id, isLike, inList },
});
export const setLiked = (payload: boolean): SetLikeActionInterface => ({
  type: TweetActionsType.SET_LIKE,
  payload,
});

export type TweetActions =
  | SetTweetActionInterface
  | SetTweetLoadingActionInterface
  | FetchTweetActionInterface
  | SetLikeActionInterface;
