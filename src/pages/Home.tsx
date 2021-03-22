import React from 'react';
import { Container, Typography, AppBar, Toolbar, Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Tweet } from '../components/Main/Tweet';
import { SideBarMenu } from '../components/Main/SideBarMenu';
import { TweetCreate } from '../components/Main/Tweet/create';
import { RightSideBar } from '../components/Main/RightSideBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& h1': {
        backgroundColor: '#999',
      },
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
    },
    rightColumnGrid: {
      marginTop: '12px',
      padding: '0px 0px 0px 2px!important',
      backgroundColor: '#fff',
      flexGrow: 1,
    },
    centerColumnGrid: {
      borderLeft: '1px solid rgb(65, 90, 78, 0.12);',
      borderRight: '1px solid rgb(65, 90, 78, 0.12);',
      position: 'relative',
      padding: '0px !important',
      backgroundColor: '#f5f5f5',
    },

    feedColumnHeadBar: {
      position: 'sticky',
      boxShadow: 'none',
      borderBottom: '1px solid rgb(65, 90, 78, 0.12);',
      marginBottom: '0px',
      '& h6': {
        paddingLeft: '8px',
      },
    },
    tweetsFeed: {},
  }),
);

export const Home = () => {
  const classes = useStyles();

  const userInfo = {
    userName: 'Maikel Bill',
    login: '@maikelele',
    published: '01.02.2021',
    avatarUrl: 'https://pbs.twimg.com/profile_images/1246806429073387520/L8ZaoO8__x96.jpg',
  };
  const TweetText = `Availability varies by region due to regulatory approval delays and/or Tesla internal
  development testing. Note: word “Beta” is used to reduce complacency in usage set
  <br></br>
  <br></br>All software is first tested internally by Tesla simulation expectations
  appropriately. All software is first tested internally by Tesla simulation QA drive
  teams.`;

  return (
    <Container className={classes.baseWrapper} maxWidth="xl">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={2} sm={3} md={3} lg={3} xl={2} className={classes.leftColumnGrid}>
          <SideBarMenu userInfo={userInfo} />
        </Grid>
        <Grid item xs={10} sm={9} md={7} lg={6} xl={7} className={classes.centerColumnGrid}>
          <AppBar className={classes.feedColumnHeadBar} color="secondary">
            <Toolbar>
              <Typography variant="h6">Главная</Typography>
            </Toolbar>
          </AppBar>
          <TweetCreate userInfo={userInfo} />
          <div className={classes.tweetsFeed}>
            {new Array(100).fill(1).map((p, i) => (
              <Tweet userInfo={userInfo} textTweet={TweetText} key={userInfo.login + '_' + i} />
            ))}
          </div>
        </Grid>
        <Hidden smDown>
          <Grid item lg={3} xl={3} className={classes.rightColumnGrid}>
            <RightSideBar />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};
