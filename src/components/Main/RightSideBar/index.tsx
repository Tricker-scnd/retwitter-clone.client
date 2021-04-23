import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SearchInput } from './componetns/SearchInput';
import { GrayBlock } from './componetns/GrayBlock/';
import { ActualThemeItem } from './componetns/GrayBlock/components/ActualThemeItem';
import { RecomendationItem } from './componetns/GrayBlock/components/RecomendationItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActualThemes } from '../../../store/ducks/actualThemes/actionCreators';
import { ActualThemesState, LoadingState } from '../../../store/ducks/actualThemes/contracts/state';
import {
  selectActualThemesItems,
  selectActualThemesLoadingState,
} from '../../../store/ducks/actualThemes/selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '../../../hooks/SearchQuery.hook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightGridColumnWrapper: {
      maxWidth: '340px',
      width: '100%',
      top: 0,
      position: 'sticky',
      paddingTop: '4px',
      margin: '0 auto',
    },
    CircularLoader: {
      display: 'block',
      margin: '20px auto',
    },
  }),
);

export const RightSideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showThemesCount, setShowThemesCount] = useState(3);
  const history = useHistory();
  const urlQuery = useQuery();
  const query = urlQuery.get('q');

  const defaultSearchPage = !query
    ? query === ''
      ? false
      : location.pathname.includes('search')
    : false;

  useEffect(() => {
    dispatch(fetchActualThemes());
  }, [dispatch]);

  const showMoreActualThemes = () => {
    if (actualThemesList.length > 3) {
      showThemesCount === 6 && history.push('/trends');
      showThemesCount === 3 && setShowThemesCount(6);
      return;
    }
    history.push('/trends');
  };
  const showMoreRecommendUsers = () => {};

  const actualThemesList: ActualThemesState['items'] = useSelector(selectActualThemesItems);
  const actualThemesLoading: boolean =
    useSelector(selectActualThemesLoadingState) === LoadingState.LOADING;

  return (
    <div className={classes.rightGridColumnWrapper}>
      {!defaultSearchPage && <SearchInput />}

      <GrayBlock showMore={showMoreActualThemes} header={'Актуальные темы для вас'}>
        {actualThemesLoading ? (
          <CircularProgress className={classes.CircularLoader} disableShrink />
        ) : (
          actualThemesList?.slice(0, showThemesCount).map((theme, i) => (
            <Link to={`/search?q=%23${theme.tag}`} key={theme._id}>
              <ActualThemeItem actualTheme={theme} />
            </Link>
          ))
        )}
      </GrayBlock>

      <GrayBlock showMore={showMoreRecommendUsers} header={'Кого читать'}>
        <RecomendationItem />
        <RecomendationItem />
        <RecomendationItem />
      </GrayBlock>
    </div>
  );
};
