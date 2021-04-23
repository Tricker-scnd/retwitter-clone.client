import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import { ActualTheme } from '../../../../../../store/ducks/actualThemes/contracts/state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ActualThemeItemWrapper: {
      position: 'relative',
      padding: '15px 10px 10px 20px',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.03)',
      },
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
      color: theme.palette.text.primary,
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
  }),
);

interface ActualThemeProps {
  actualTheme: ActualTheme;
}
export const ActualThemeItem = ({ actualTheme }: ActualThemeProps) => {
  const classes = useStyles();

  return (
    <div className={classes.ActualThemeItemWrapper}>
      <div className={classes.ActualThemeItemType}>{actualTheme.name}</div>
      <div className={classes.ActualThemeItemHashtag}>#{actualTheme.tag}</div>
      <div className={classes.ActualThemeItemCountTweets}>Твитов: {actualTheme.tweetsCount}</div>
      <IconButton aria-label="delete" className={classes.ActualThemeItemActions}>
        <MoreHorizRoundedIcon color="primary" />
      </IconButton>
    </div>
  );
};
