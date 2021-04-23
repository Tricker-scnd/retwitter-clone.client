import axios from 'axios';
import { SearchContentFetchResult } from '../../store/ducks/search/contracts/state';

export const searchQuery = (query: string): Promise<SearchContentFetchResult> => {
  return axios.get(`/search/${query.replaceAll('#', '%23')}`).then((response) => response.data);
};
