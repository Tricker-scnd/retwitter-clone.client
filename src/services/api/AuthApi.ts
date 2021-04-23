import axios from 'axios';

import {
  AuthorizeState,
  BusyValuesResult,
  LoginPostData,
  RegistrationPostData,
} from '../../store/ducks/currentUser/contracts/state';

export const AuthApi = {
  async signUp(postData: LoginPostData): Promise<AuthorizeState> {
    return await axios.post('/auth/login', postData).then((response) => response.data);
  },
  async getUserInfo(): Promise<AuthorizeState> {
    return await axios
      .get('/users/me')
      .then((response) => response.data)
      .catch();
  },
  async LogOut() {
    return await axios
      .post('/auth/logout')
      .then((response) => response.data)
      .catch(() => {
        return;
      });
  },

  async register(postData: RegistrationPostData): Promise<void> {
    return await axios.post('/auth/register', postData).then((response) => response.data);
  },

  async registerCheckForBusy(getData: {
    phone?: string;
    email?: string;
    login?: string;
  }): Promise<BusyValuesResult> {
    return await axios
      .get(
        `/auth/register/check/?phone=${getData?.phone}&email=${getData?.email}&login=${getData?.login}`,
      )
      .then((response) => response.data);
  },

  async ActivateAccount(hash: string) {
    return await axios.get(`/auth/verify?hash=${hash}`).then((response) => response.data);
  },
};
