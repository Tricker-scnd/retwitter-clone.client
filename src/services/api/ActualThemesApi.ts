import  axios  from 'axios';

export const getActualThemes = () => {
  return axios.get('/themes').then((response) => response.data);
};
