import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MainTopBar } from '../../components/Main/common/MainTopBar';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '../../store/ducks/search/contracts/state';
import { fetchActualThemes } from '../../store/ducks/actualThemes/actionCreators';
import { ActualThemesState } from '../../store/ducks/actualThemes/contracts/state';
import {
  selectActualThemesItems,
  selectActualThemesLoadingState,
} from '../../store/ducks/actualThemes/selectors';
import { ActualThemeItem } from '../../components/Main/RightSideBar/componetns/GrayBlock/components/ActualThemeItem';
import { Link } from 'react-router-dom';
import { SearchInput } from '../../components/Main/RightSideBar/componetns/SearchInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TweetsLoader: {
      display: 'block',
      margin: '20px auto',
    },
  }),
);

interface ActualThemesProps {
  searchBar?: boolean;
}
export const ActualThemes = ({ searchBar }: ActualThemesProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActualThemes());
  }, [dispatch]);

  const actualThemesList: ActualThemesState['items'] = useSelector(selectActualThemesItems);
  const actualThemesLoading: boolean =
    useSelector(selectActualThemesLoadingState) === LoadingState.LOADING;

  return (
    <>
      <MainTopBar text={`Актуальные темы`} arrowBack={true} />
      <SearchInput main={true} />
      {actualThemesLoading ? (
        <CircularProgress className={classes.TweetsLoader} disableShrink />
      ) : (
        actualThemesList?.map((theme, i) => (
          <Link to={`/search?q=%23${theme.tag}`} key={theme._id}>
            <ActualThemeItem actualTheme={theme} />
          </Link>
        ))
      )}
    </>
  );
};
