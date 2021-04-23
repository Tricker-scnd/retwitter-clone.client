export enum AuthorizeResultState {
  NEVER = 'never',
  ERROR = 'error',
  UNSIGNED = 'unsigned',
  NOTCONFIRNMED = 'notconfirmed',
  SUCCESS = 'success',
}

export interface LoginPostData {
  login: String;
  password: String;
}

export interface CurrentUser {
  _id: string;
  confirmed?: boolean;
  verified?: boolean;
  avatarSrc: string;
  email?: string;
  fullname: string;
  login: string;
  subscribers?: string[];
  subscriptions?: string[];
  subCount?: number;
  pinnedTweet?: String;
}

export interface AuthorizeState {
  status: AuthorizeResultState;
  data: CurrentUser | null;
  subscribers: SubState[];
  subscriptions: SubscriptionState[];
}

export interface RegistrationPostData {
  login: String;
  password: String;
  passwordConfirm: String;
  email: String;
  fullname: String;
  phone: String;
  birthDate: String;
}

export interface BusyValuesResult {
  status: string;
  message: string;
}

export interface ProfileEditState {
  avatar?: any;
  about?: string;
}

export interface ProfileEditStatusState {
  status: AuthorizeResultState.NEVER | AuthorizeResultState.ERROR | AuthorizeResultState.SUCCESS;
  data: string;
}

export interface SubState {
  _id: string;
  fullname: string;
  login: string;
  avatarSrc: string;
}
export interface SubscriptionState {
  _id: string;
  fullname: string;
  login: string;
  avatarSrc: string;
}
