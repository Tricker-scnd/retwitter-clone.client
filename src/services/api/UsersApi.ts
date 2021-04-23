import axios from 'axios';
import {
  ProfileEditState,
  SubscriptionState,
  SubState,
} from '../../store/ducks/currentUser/contracts/state';
import {
  FetchSpecialUserState,
  fetchSubscribeResult,
  SpecialUser,
} from '../../store/ducks/users/contracts/state';

export const UsersApi = {
  async getProfile(login: string): Promise<SpecialUser> {
    return await axios.get(`/profile/${login}`).then((response) => response.data);
  },

  async editProfile(data: ProfileEditState): Promise<FetchSpecialUserState> {
    let formData = new FormData();
    formData.append('avatar', data.avatar);
    formData.append('about', data.about!);

    return await axios
      .post(`/profile/`, formData, {
        headers: {
          'Content-Type': 'Multipart/form-data',
        },
      })
      .then((response) => response.data);
  },

  async subscribeTo(userId: string): Promise<fetchSubscribeResult> {
    return await axios.post(`/users/subscribe`, { userId }).then((response) => response.data);
  },
  async unsubscribeTo(userId: string): Promise<fetchSubscribeResult> {
    return await axios.post(`/users/unsubscribe`, { userId }).then((response) => response.data);
  },
  async getSubsList(userId: string): Promise<SubState[]> {
    return await axios.get(`/user/getsubs/${userId}`).then((response) => response.data);
  },
  async getSubscriptionsList(userId: string): Promise<SubscriptionState[]> {
    return await axios.get(`/user/getsubscriptions/${userId}`).then((response) => response.data);
  },
};
