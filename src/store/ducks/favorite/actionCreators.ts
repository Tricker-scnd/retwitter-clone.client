import { Action } from 'redux';
import { LoadingState,  TweetsState } from './contracts/state';

export enum TweetsActionsType {
  SET_FAVORITE_TWEETS = 'tweets/SET_FAVORITE_TWEETS',
  FETCH_FAVORITE_TWEETS = 'tweets/FETCH_FAVORITE_TWEETS',
  SET_LOADING_STATE = 'tweets/SET_LOADING_STATE',

}

export interface SetFavoriteTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_FAVORITE_TWEETS;
  payload: TweetsState['items'];
}
export interface FetchFavoriteTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_FAVORITE_TWEETS;
}
export interface SetTweetsLoadingActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}

export const setFavoriteTweets = (
  payload: TweetsState['items'],
): SetFavoriteTweetsActionInterface => ({
  type: TweetsActionsType.SET_FAVORITE_TWEETS,
  payload,
});
export const setTweetsLoading = (payload: LoadingState): SetTweetsLoadingActionInterface => ({
  type: TweetsActionsType.SET_LOADING_STATE,
  payload,
});
export const fetchFavoriteTweets = (): FetchFavoriteTweetsActionInterface => ({
  type: TweetsActionsType.FETCH_FAVORITE_TWEETS,
});

export type TweetsActions = SetTweetsLoadingActionInterface | SetFavoriteTweetsActionInterface;
