import { AuthorizeState } from './contracts/state';

interface CurrentUserRootState {
  currentUser: AuthorizeState;
}

export const selectAuthorizeInfo = (state: CurrentUserRootState) => state.currentUser;
export const selectCurrentUserInfo = (state: CurrentUserRootState) => state.currentUser.data;
export const selectAuthorizeStatus = (state: CurrentUserRootState) => state.currentUser.status;
export const selectCurrentUserSubscribers = (state: CurrentUserRootState) =>
  state.currentUser.data?.subscribers;
export const selectCurrentUserSubscriptions = (state: CurrentUserRootState) =>
  state.currentUser.data?.subscriptions;

export const selectSubscribersList = (state: CurrentUserRootState) => state.currentUser.subscribers;
export const selectSubscriptionsList = (state: CurrentUserRootState) =>
  state.currentUser.subscriptions;
