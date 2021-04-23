import { Action } from 'redux';
import {
  AuthorizeResultState,
  AuthorizeState,
  LoginPostData,
  ProfileEditState,
  SubscriptionState,
  SubState,
} from './contracts/state';

export enum CurrentUserActionType {
  SIGN_UP = 'currentUser/SIGN_UP',
  LOG_OUT = 'currentUser/LOG_OUT',
  LOG_OUT_REQUEST = 'currentUser/LOG_OUT_REQUEST',
  SET_AUTHORIZE_STATUS = 'currentUser/SET_AUTHORIZE_STATUS',
  CHANGE_AUTHORIZE_STATUS = 'currentUser/CHANGE_AUTHORIZE_STATUS',
  SET_USER_INFO = 'currentUser/SET_USER_INFO',
  FETCH_GET_USER_INFO = 'currentUser/FETCH_GET_USER_INFO',
  EDIT_PROFILE = 'currentUser/EDIT_PROFILE',

  GET_SUBS = 'currentUser/GET_SUBS',
  GET_SUBSCRIPTIONS = 'currentUser/GET_SUBSCRIPTIONS',
  SET_SUBS = 'currentUser/SET_SUBS',
  SET_SUBSCRIPTIONS = 'currentUser/SET_SUBSCRIPTIONS',
}

export interface SetCurrentUserInfoInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.SET_USER_INFO;
  payload: AuthorizeState;
}

export interface FetchGetCurrentUserInfoInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.FETCH_GET_USER_INFO;
}

export interface SignUpInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.SIGN_UP;
  payload: LoginPostData;
}
export interface LogOutInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.LOG_OUT;
}
export interface LogOutRequestInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.LOG_OUT_REQUEST;
}

export interface SetAuthorizeStatusInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.SET_AUTHORIZE_STATUS;
  payload: AuthorizeResultState;
}
export interface ChangeAuthorizeStatusInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.CHANGE_AUTHORIZE_STATUS;
  payload: AuthorizeResultState;
}
export interface EditProfileInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.EDIT_PROFILE;
  payload: ProfileEditState;
}
export interface GetSubsListInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.GET_SUBS;
  payload: string;
}
export interface GetSubscriptionsListInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.GET_SUBSCRIPTIONS;
  payload: string;
}
export interface SetSubsListInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.SET_SUBS;
  payload: SubState[];
}
export interface SetSubscriptionsListInterface extends Action<CurrentUserActionType> {
  type: CurrentUserActionType.SET_SUBSCRIPTIONS;
  payload: SubscriptionState[];
}

//-------------------

export const SetCurrentUser = (payload: AuthorizeState): SetCurrentUserInfoInterface => ({
  type: CurrentUserActionType.SET_USER_INFO,
  payload,
});

export const FetchGetCurrentUserInfo = (): FetchGetCurrentUserInfoInterface => ({
  type: CurrentUserActionType.FETCH_GET_USER_INFO,
});

export const SignUp = (payload: LoginPostData): SignUpInterface => ({
  type: CurrentUserActionType.SIGN_UP,
  payload,
});
export const LogOut = (): LogOutInterface => ({
  type: CurrentUserActionType.LOG_OUT,
});
export const LogOutRequest = (): LogOutRequestInterface => ({
  type: CurrentUserActionType.LOG_OUT_REQUEST,
});

export const SetAuthorizeStatus = (payload: AuthorizeResultState): SetAuthorizeStatusInterface => ({
  type: CurrentUserActionType.SET_AUTHORIZE_STATUS,
  payload,
});

export const ChangeAuthorizeStatus = (
  payload: AuthorizeResultState,
): ChangeAuthorizeStatusInterface => ({
  type: CurrentUserActionType.CHANGE_AUTHORIZE_STATUS,
  payload,
});

export const EditProfile = (payload: ProfileEditState): EditProfileInterface => ({
  type: CurrentUserActionType.EDIT_PROFILE,
  payload,
});

export const getSubs = (id: string): GetSubsListInterface => ({
  type: CurrentUserActionType.GET_SUBS,
  payload: id,
});
export const getSubscriptions = (id: string): GetSubscriptionsListInterface => ({
  type: CurrentUserActionType.GET_SUBSCRIPTIONS,
  payload: id,
});
export const setSubs = (payload: SubState[]): SetSubsListInterface => ({
  type: CurrentUserActionType.SET_SUBS,
  payload,
});
export const setSubscriptions = (payload: SubscriptionState[]): SetSubscriptionsListInterface => ({
  type: CurrentUserActionType.SET_SUBSCRIPTIONS,
  payload,
});

export type CurrentUserActions =
  | SetCurrentUserInfoInterface
  | SetAuthorizeStatusInterface
  | ChangeAuthorizeStatusInterface
  | LogOutInterface
  | SetSubsListInterface
  | SetSubscriptionsListInterface;
