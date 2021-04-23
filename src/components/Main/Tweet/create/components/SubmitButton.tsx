import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tweetCreateActionsRightWrap: {
      display: 'flex',
      alignItems: 'center',
    },
    tweetCreateActionsCircleProgressBlock: {
      position: 'relative',
      marginRight: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    circleRelative: {
      position: 'absolute',
      color: '#eee',
    },
    letterLimitLabel: {
      fontSize: '12px',
      marginRight: '6px',
    },
    LimitWarning: {
      color: 'red',
    },
    progressBlockWrapper: {
      display: 'flex',
      alignItems: 'center',

      '&.showProgressBlock': {
        display: 'flex',
      },
    },
  }),
);

interface SubmitButtonProps {
  tweetText: string;
  letterLimit: number;
  textProgress: number;
  AddTweetHandle: () => void;
  tweetBtnDisabled: boolean;
}

export const SubmitButton = ({
  tweetText,
  letterLimit,
  textProgress,
  AddTweetHandle,
  tweetBtnDisabled,
}: SubmitButtonProps) => {
  const classes = useStyles();
  return (
    <div className={classes.tweetCreateActionsRightWrap}>
      {tweetText && (
        <div className={classes.progressBlockWrapper}>
          <span className={classes.letterLimitLabel}>
            {tweetText.length} / {letterLimit}
          </span>
          <div className={classes.tweetCreateActionsCircleProgressBlock}>
            <CircularProgress
              size={30}
              variant="determinate"
              value={100}
              className={classes.circleRelative}
            />

            <CircularProgress
              size={30}
              className={textProgress > 100 ? classes.LimitWarning : undefined}
              variant="determinate"
              value={textProgress > 100 ? 100 : textProgress}
            />
          </div>
        </div>
      )}

      <Button
        onClick={AddTweetHandle}
        variant="contained"
        color="primary"
        disabled={tweetBtnDisabled}>
        Твитнуть
      </Button>
    </div>
  );
};
