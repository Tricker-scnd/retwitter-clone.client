import { put, takeEvery } from '@redux-saga/core/effects';
import { call } from 'redux-saga/effects';
import { AuthApi } from '../../../services/api/AuthApi';
import {
  CurrentUserActionType,
  EditProfileInterface,
  GetSubscriptionsListInterface,
  GetSubsListInterface,
  LogOut,
  SetAuthorizeStatus,
  SetAuthorizeStatusInterface,
  SetCurrentUser,
  setSubs,
  setSubscriptions,
  SignUpInterface,
} from './actionCreators';
import {
  AuthorizeResultState,
  AuthorizeState,
  ProfileEditState,
  ProfileEditStatusState,
  SubscriptionState,
  SubState,
} from './contracts/state';
import { setStorageAuthorize } from '../../../hooks/Auth.hook';
import { UsersApi } from '../../../services/api/UsersApi';

export function* currentUserSagaWatcher() {
  yield takeEvery(CurrentUserActionType.FETCH_GET_USER_INFO, FetchGetCurrentUserInfo);
  yield takeEvery(CurrentUserActionType.SIGN_UP, SignUp);
  yield takeEvery(CurrentUserActionType.LOG_OUT_REQUEST, LogOutRequest);
  yield takeEvery(CurrentUserActionType.CHANGE_AUTHORIZE_STATUS, ChangeStatus);
  yield takeEvery(CurrentUserActionType.EDIT_PROFILE, EditProfileRequest);
  yield takeEvery(CurrentUserActionType.GET_SUBS, getSubsRequest);
  yield takeEvery(CurrentUserActionType.GET_SUBSCRIPTIONS, getSubscriptionsRequest);
}

export function* SignUp({ payload }: SignUpInterface) {
  try {
    const SignUpResult: AuthorizeState = yield call(AuthApi.signUp, payload);
    yield put(SetCurrentUser(SignUpResult));
    setStorageAuthorize('true');
  } catch (error) {
    yield put(SetAuthorizeStatus(AuthorizeResultState.ERROR));
  }
}

export function* LogOutRequest() {
  try {
    yield call(AuthApi.LogOut);
    yield put(LogOut());
  } catch (error) {
    yield put(LogOut());
  }
}

export function* FetchGetCurrentUserInfo() {
  try {
    const fetchUserResult: AuthorizeState = yield call(AuthApi.getUserInfo);
    yield put(SetCurrentUser(fetchUserResult));
    if (fetchUserResult.status === AuthorizeResultState.SUCCESS) {
      setStorageAuthorize('true');
    } else {
      setStorageAuthorize('');
      yield put(SetAuthorizeStatus(AuthorizeResultState.UNSIGNED));
    }
  } catch (error) {
    yield put(SetAuthorizeStatus(AuthorizeResultState.UNSIGNED));
    setStorageAuthorize('');
  }
}

export function* ChangeStatus({ payload }: SetAuthorizeStatusInterface) {
  try {
    yield put(SetAuthorizeStatus(payload));
  } catch (error) {}
}

export function* EditProfileRequest({ payload }: EditProfileInterface) {
  try {
    const editProfileResutl: ProfileEditStatusState = yield call(UsersApi.editProfile, payload);
    console.log(editProfileResutl);
  } catch (error) {
    console.log('err', error);
  }
}

export function* getSubsRequest({ payload }: GetSubsListInterface) {
  try {
    const subs: { data: SubState[] } = yield call(UsersApi.getSubsList, payload);
    yield put(setSubs(subs.data));
  } catch (error) {}
}

export function* getSubscriptionsRequest({ payload }: GetSubscriptionsListInterface) {
  try {
    const subscriptions: { data: SubscriptionState[] } = yield call(
      UsersApi.getSubscriptionsList,
      payload,
    );
    yield put(setSubscriptions(subscriptions.data));
  } catch (error) {}
}
