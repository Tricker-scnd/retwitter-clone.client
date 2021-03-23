import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SearchInput } from './componetns/SearchInput';
import { GrayBlock } from './componetns/GrayBlock';
import { IconButton, Avatar, Button } from '@material-ui/core';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightGridColumnWrapper: {
      maxWidth:'340px',
      width: '100%',
      top: 0,
      position: 'sticky',
      paddingTop: '4px',
      margin: '0 auto',
    },
    ActualThemeItemWrapper: {
      position: 'relative',
      padding: '15px 10px 10px 20px',
    },
    ActualThemeItemType: {
      color: theme.palette.text.secondary,
      fontWeight: 500,
      fontSize: '13px',
    },
    ActualThemeItemHashtag: {
      fontWeight: 800,
      marginTop: '3px',
      fontSize: '16px',
    },
    ActualThemeItemCountTweets: {
      marginTop: '5px',
      color: theme.palette.text.secondary,
      fontSize: '13px',
    },
    ActualThemeItemActions: {
      position: 'absolute',
      right: '10px',
      top: '10px',
    },
    RecomendationItemWrapper: {
      position: 'relative',
      padding: '19px 10px 14px 20px',
      display: 'flex',
    },
    RecomendationItemRight: {
      display: 'flex',
      flexGrow:1,
      alignItems:'center',
      justifyContent:'space-between',
    },
    RecomendationItemNameBLock: {
      marginLeft: '6px',
    },
    RecItemName: {
      fontSize: '15px',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        fontSize: '20px',
      },
    },
    RecItemLogin: {
      fontSize: '14px',
      fontWeight: 500,
    },
    RecItemButton: {
      padding: '1px 5px',
      height:'30px',
      '& span': {
        fontSize: '12px',
        fontWeight:600,
      },
    },
  }),
);

const ActualThemeItem = () => {
  const classes = useStyles();

  return (
    <div className={classes.ActualThemeItemWrapper}>
      <div className={classes.ActualThemeItemType}>Бизнес и финансы · Актуально</div>
      <div className={classes.ActualThemeItemHashtag}>#Bitcoin</div>
      <div className={classes.ActualThemeItemCountTweets}>Твитов: 172 тыс.</div>
      <IconButton aria-label="delete" className={classes.ActualThemeItemActions}>
        <MoreHorizRoundedIcon color="primary" />
      </IconButton>
    </div>
  );
};

const RecomendationItem = () => {
  const classes = useStyles();

  return (
    <div className={classes.RecomendationItemWrapper}>
      <Avatar src="https://pbs.twimg.com/profile_images/1326313041449918464/P7tcCvdd_x96.jpg" />
      <div className={classes.RecomendationItemRight}>
        <div className={classes.RecomendationItemNameBLock}>
          <span className={classes.RecItemName}>
            100T Hiko <CheckCircleSharpIcon color="primary" />
          </span>
          <span className={classes.RecItemLogin}>@Hiko</span>
        </div>
        <Button variant="outlined" color="primary" className={classes.RecItemButton}>
          Читать
        </Button>
      </div>
    </div>
  );
};

export const RightSideBar = () => {
  const classes = useStyles();

  const showMore = () => {
    alert('show more');
  };

  return (
    <div className={classes.rightGridColumnWrapper}>
      <SearchInput />
      <GrayBlock showMore={showMore} header={'Актуальные темы для вас'}>
        <ActualThemeItem />
        <ActualThemeItem />
        <ActualThemeItem />
      </GrayBlock>
      <GrayBlock showMore={showMore} header={'Кого читать'}>
        <RecomendationItem />
        <RecomendationItem />
        <RecomendationItem />
      </GrayBlock>
    </div>
  );
};
