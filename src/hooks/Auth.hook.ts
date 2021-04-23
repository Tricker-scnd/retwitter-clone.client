import { useDispatch } from 'react-redux';
import { FetchGetCurrentUserInfo } from '../store/ducks/currentUser/actionCreators';

const storageName = 'userAuthSession';
export const setStorageAuthorize = (type: string) => localStorage.setItem(storageName, type);

export const useAuth = () => {
  const dispatch = useDispatch();
  const checkUser = () => dispatch(FetchGetCurrentUserInfo());
  const checkAuth = () => !!localStorage.getItem(storageName);

  return { checkUser, checkAuth };
};
