import React from 'react';
import { Container, Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SideBarMenu } from '../components/Main/LeftSideBar';
import { RightSideBar } from '../components/Main/RightSideBar';
import { Route, Switch } from 'react-router';
import { MainTopBar } from '../components/Main/common/MainTopBar';
import { FullTweet } from './components/FullTweet';
import { ProfilePage } from './components/Profile';
import { SearchPage } from './components/SearchPage';
import { Main } from './components/Main';
import { ActualThemes } from './components/ActualThemes';
import { FavoritePage } from './components/FavoritePage';
import { UsersPage } from './components/UsersPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& h1': {
        backgroundColor: '#999',
      },
      '& a': {
        textDecoration: 'none',
      },
      minHeight: '101%',
    },
    baseWrapper: {
      height: '100vh',
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    searchTextInput: {
      '& > div': {
        borderRadius: '26px',
        backgroundColor: '#2f504a12',
      },
      '& >  .Mui-focused': {
        backgroundColor: '#fff',
      },
      '& input': {
        paddingTop: '12px',
        paddingBottom: '12px',
      },
    },
    leftColumnGrid: {
      marginTop: '20px',
      padding: '0px 0px 0px 10px!important',

      [theme.breakpoints.down('xs')]: {
        padding: '0px 0px 0px 1px!important',
      },
      [theme.breakpoints.down('lg')]: {},
    },
    rightColumnGrid: {
      paddingTop: '12px',
      padding: '0px 0px 0px 2px!important',
      backgroundColor: '#fff',
      flexGrow: 1,
      boxSizing: 'border-box',
      [theme.breakpoints.down('lg')]: {
        padding: '0px 0px 0px 10px!important',
      },
    },
    centerColumnGrid: {
      borderLeft: '1px solid rgb(65, 90, 78, 0.12);',
      borderRight: '1px solid rgb(65, 90, 78, 0.12);',
      position: 'relative',
      padding: '0px !important',
      backgroundColor: '#fff',
    },

    tweetsFeed: {},
    TweetsLoader: {
      display: 'block',
      margin: '0 auto',
    },
    delimetr: {
      backgroundColor: 'rgb(247, 249, 250)',
      height: '12px',
      borderBottom: '1px solid rgb(235, 238, 240)',
    },
  }),
);

export const Home = () => {
  const classes = useStyles();

  return (
    <Container className={classes.baseWrapper} maxWidth="xl">
      <Grid container className={classes.root} justify="center">
        <Grid item xs={2} sm={3} md={3} lg={2} xl={2} className={classes.leftColumnGrid}>
          <SideBarMenu />
        </Grid>

        <Grid item xs={10} sm={9} md={6} lg={5} xl={4} className={classes.centerColumnGrid}>
          <Switch>
            <Route path={['/home', '/']} exact>
              <MainTopBar text={'Главная'} arrowBack={false} />
              <Main />
            </Route>
            <Route path="/search">
              <SearchPage />
            </Route>
            <Route path="/trends">
              <ActualThemes />
            </Route>
            <Route path="/favorite">
              <FavoritePage />
            </Route>
            <Route path="/users">
              <UsersPage />
            </Route>
            <Route path="/*/status/*">
              <MainTopBar text={'Твитнуть'} arrowBack={true} />
              <FullTweet />
            </Route>
            <Route path="/:login" exact>
              <ProfilePage />
            </Route>
          </Switch>
        </Grid>

        <Hidden smDown>
          <Grid item md={3} lg={3} xl={3} className={classes.rightColumnGrid}>
            <RightSideBar />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};
