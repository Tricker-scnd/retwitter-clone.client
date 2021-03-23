import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperRoot: {
      backgroundColor: 'rgb(246, 248, 249)',
      border: 'none',
      boxShadow: 'none',
      marginTop: '40px',
      borderRadius: '16px',
      overflow: 'hidden',
    },
    paperItemsWrapper: {
      '& > *': {
        borderBottom: '1px solid #e2e2e2',
      },
    },
    GrayBlockHead: {
      padding: '15px 10px 10px 20px',
      '& h5': {
        fontSize: '20px',
        fontWeight: 800,
      },
      borderBottom: '1px solid #e2e2e2',

    },
    GrayBlockActions: {
      padding: '15px 10px 15px 20px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgb(239, 241, 242)',
      },
    },
    GrayBlockActionShowMore: {
      color: theme.palette.primary.light,
      fontWeight: 600,
    },
  }),
);

interface GrayBlockProps {
  header: string;
  children: React.ReactNode;
  showMore: any;
}

export const GrayBlock = ({ header, showMore, children }: GrayBlockProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperRoot}>
      <div className={classes.GrayBlockHead}>
        <Typography variant="h5">{header}</Typography>
      </div>
      <div className={classes.paperItemsWrapper}>
          {children}
        </div>
      <div className={classes.GrayBlockActions} onClick={showMore}>
        <div className={classes.GrayBlockActionShowMore}>Показать еще</div>
      </div>
    </Paper>
  );
};
