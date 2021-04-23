import axios from 'axios';
import { axios as multipartAxios } from '../../core/axios';
import { pinState } from '../../store/ducks/tweet/contracts/state';

import { AddTweetState, Tweet } from '../../store/ducks/tweets/contracts/state';
import { SpecialUser } from '../../store/ducks/users/contracts/state';

export const getTweets = () => {
  return axios.get('/tweets').then((response) => response.data);
};
export const getFavoriteTweets = () => {
  return axios.get('/tweets/favorite').then((response) => response.data);
};

export const getUserTweets = (id: SpecialUser['_id']): Promise<Tweet[]> => {
  return axios.get(`/tweets/${id}`).then((response) => response.data);
};

export const fetchAddTweet = async (data: FormData): Promise<Tweet> => {
  return multipartAxios
    .post('/tweet', data, {
      headers: {
        'Content-Type': 'Multipart/form-data',
      },
    })
    .then((response) => response.data);
};

export const getTweet = (Api: string): Promise<Tweet[]> => {
  return axios.get(Api).then((response) => response.data);
};

export const deleteTweet = (id: string): Promise<Tweet[]> => {
  return axios.delete(`/tweet/${id}`).then((response) => response.data);
};

export const likeTweet = (tweetId: string) => {
  return axios.post(`/tweet/like`, { tweetId }).then((response) => response.data);
};

export const removeLikeTweet = (tweetId: string) => {
  return axios.post(`/tweet/removelike`, { tweetId }).then((response) => response.data);
};

export const pinTweetRequest = (tweetId: string, type: pinState) => {
  return axios.post(`/tweet/pin`, { tweetId, type }).then((response) => response.data);
};
