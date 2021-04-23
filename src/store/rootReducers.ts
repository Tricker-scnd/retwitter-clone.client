import { combineReducers } from 'redux';
import { tweetsReducer } from './ducks/tweets/reducer';
import { ActualThemesReducer } from './ducks/actualThemes/reducer';
import { tweetReducer } from './ducks/tweet/reducer';
import { CurrentUserReducer } from './ducks/currentUser/reducer';
import { SpecialUserReducer } from './ducks/users/reducer';
import { SearchReducer } from './ducks/search/reducer';
import { FavoritesReducer } from './ducks/favorite/reducer';

const rootReducer = combineReducers({
  tweets: tweetsReducer,
  tweet: tweetReducer,
  actualThemes: ActualThemesReducer,
  currentUser: CurrentUserReducer,
  specialUser: SpecialUserReducer,
  search: SearchReducer,
  favorite: FavoritesReducer,
});

export default rootReducer;
