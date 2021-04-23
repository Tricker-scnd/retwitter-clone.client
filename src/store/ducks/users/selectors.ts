import { SpecialUserState } from './contracts/state';

interface SpecialUserRootState {
  specialUser: SpecialUserState;
}

export const selectSpecialUserState = (state: SpecialUserRootState) => state.specialUser;
export const selectSpecialUserInfo = (state: SpecialUserRootState) => state.specialUser.user;
export const selectSpecialUserTweets = (state: SpecialUserRootState) =>
  state.specialUser.userTweets;
export const selectSpecialUserStatus = (state: SpecialUserRootState) => state.specialUser.status;
