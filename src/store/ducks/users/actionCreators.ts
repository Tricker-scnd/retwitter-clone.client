import { Action } from 'redux';
import { Tweet } from '../tweets/contracts/state';
import { SpecialUserLoadingState, SpecialUser } from './contracts/state';

export enum UsersActionType {
  GET_USER_PROFILE = 'users/GET_USER_PROFILE',
  SET_USER_PROFILE = 'users/SET_USER_PROFILE',
  SET_LOADING_USER_PROFILE_STATUS = 'users/SET_LOADING_USER_PROFILE_STATUS',
  GET_USER_TWEETS = 'users/GET_USER_TWEETS',
  SET_USER_TWEETS = 'users/SET_USER_TWEETS',
}

export interface GetSpecialUserInterface extends Action<UsersActionType> {
  type: UsersActionType.GET_USER_PROFILE;
  payload: string;
}
export interface SetSpecialUserInterface extends Action<UsersActionType> {
  type: UsersActionType.SET_USER_PROFILE;
  payload: SpecialUser;
}

export interface SetSpecialUserLoadingInterface extends Action<UsersActionType> {
  type: UsersActionType.SET_LOADING_USER_PROFILE_STATUS;
  payload: SpecialUserLoadingState;
}

export interface GetSpecialUserTweetsInterface extends Action<UsersActionType> {
  type: UsersActionType.GET_USER_TWEETS;
  payload: SpecialUser['_id'];
}
export interface SetSpecialUserTweetsInterface extends Action<UsersActionType> {
  type: UsersActionType.SET_USER_TWEETS;
  payload: Tweet[] | null;
}

//-------------------

export const GetSpecialUser = (payload: string): GetSpecialUserInterface => ({
  type: UsersActionType.GET_USER_PROFILE,
  payload,
});

export const SetSpecialUser = (payload: SpecialUser): SetSpecialUserInterface => ({
  type: UsersActionType.SET_USER_PROFILE,
  payload,
});

export const SetStatusSpecialUser = (
  payload: SpecialUserLoadingState,
): SetSpecialUserLoadingInterface => ({
  type: UsersActionType.SET_LOADING_USER_PROFILE_STATUS,
  payload,
});

export const GetSpecialUserTweets = (
  payload: SpecialUser['_id'],
): GetSpecialUserTweetsInterface => ({
  type: UsersActionType.GET_USER_TWEETS,
  payload,
});

export const SetSpecialUserTweets = (payload: Tweet[] | null): SetSpecialUserTweetsInterface => ({
  type: UsersActionType.SET_USER_TWEETS,
  payload,
});

export type SpecialUserActions =
  | SetSpecialUserInterface
  | SetSpecialUserLoadingInterface
  | SetSpecialUserTweetsInterface;
