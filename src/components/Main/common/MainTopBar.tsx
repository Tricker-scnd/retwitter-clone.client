import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    feedColumnHeadBar: {
      position: 'sticky',
      boxShadow: 'none',
      borderBottom: '1px solid rgb(65, 90, 78, 0.12);',
      marginBottom: '0px',
      '& h6': {
        paddingLeft: '8px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
          fontSize: '16px',
        },
      },
    },
    feedColumnToolbar: {
      display: 'flex',
      alignItems: 'center',

      '& a': {
        display: 'inline-flex',
      },
    },
    searchText: {
      fontSize: '14px',
      maxWidth: '310px',
      height: '18px',
      marginLeft: '8px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      [theme.breakpoints.down('md')]: {
        maxWidth: '280px',
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: '180px',
      },
    },
  }),
);

interface BarProps {
  arrowBack: boolean;
  text: string;
  searchText?: string;
}

export const MainTopBar: React.FC<BarProps> = ({ arrowBack, text, searchText }: BarProps) => {
  const classes = useStyles();
  const history = useHistory();

  const arrowBackClick = () => {
    history.goBack();
  };

  return (
    <AppBar className={classes.feedColumnHeadBar} color="secondary">
      <Toolbar className={classes.feedColumnToolbar}>
        {arrowBack && (
          <IconButton onClick={arrowBackClick}>
            <ArrowBackIcon color="primary" />
          </IconButton>
        )}
        <Typography variant="h6">
          {text} <span className={classes.searchText}>{searchText}</span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
