import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MainTopBar } from '../../components/Main/common/MainTopBar';
import { TweetFeed } from '../../components/Main/TweetFeed';
import { useQuery } from '../../hooks/SearchQuery.hook';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { resetSearch, searchRequest } from '../../store/ducks/search/actionCreators';
import {
  selectSearchLoadingState,
  selectSearchResultItems,
} from '../../store/ducks/search/selectors';
import { Tweet } from '../../store/ducks/tweets/contracts/state';
import { LoadingState } from '../../store/ducks/search/contracts/state';
import { ActualThemes } from './ActualThemes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TweetsLoader: {
      display: 'block',
      margin: '20px auto',
    },
  }),
);

export const SearchPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const tweetsList: Tweet[] = useSelector(selectSearchResultItems);
  const tweetsLoading: boolean = useSelector(selectSearchLoadingState) === LoadingState.LOADING;

  const urlQuery = useQuery();
  const query = urlQuery.get('q');

  const defaultSearchPage = !query ? (query === '' ? false : true) : false;

  const searchContentLoading = false;
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      dispatch(searchRequest(query));
    }
  }, [query]);

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, []);

  return (
    <>
      {!defaultSearchPage ? (
        <>
          <MainTopBar text={`Поиск`} searchText={searchQuery} arrowBack={true} />

          {searchContentLoading ? (
            <CircularProgress className={classes.TweetsLoader} disableShrink />
          ) : (
            <TweetFeed
              tweetsList={tweetsList}
              tweetsLoading={tweetsLoading}
              emptyMessage={'По вашему запросу ничего не найдено...'}
            />
          )}
        </>
      ) : (
        <ActualThemes searchBar={true} />
      )}
    </>
  );
};
