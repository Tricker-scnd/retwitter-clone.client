import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import GifOutlinedIcon from '@material-ui/icons/GifOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tweetItemRoot: {
      padding: '16px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      borderBottom: '1px solid rgb(65, 90, 78, 0.12);',
      borderRadius: '0px',
      transition: '0.1s all',
      boxShadow: 'none',
      marginBottom: '16px',
    },
    tweetLeftSide: {},
    tweetRightSide: {
      boxSizing: 'border-box',
    },
    userAvatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      width: '60px',
      height: '60px',
      margin: '0 auto',
    },
    tweetUserInfo: {
      display: 'flex',
      alignItems: 'center',
      '& b': {
        marginRight: '8px',
        fontSize: '16px',
      },
    },

    tweetContentBlock: {
      marginTop: '6px',
    },
    tweetEditField: {
      border: 'none',
      outline: 'none',
      fontSize: '18px',
      padding: '15px 8px',
      fontFamily: theme.typography.fontFamily,
      resize: 'none',
      width: '95%',
      maxHeight:'unset',
      '&:focus ~ div': {
        borderTop: '1px solid rgba(224 ,224 ,224 , 0.53)',
      },
    },
    tweetCreateActions: {
      marginTop: '14px',
      borderTop: '1px solid #fff',
      paddingTop: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tweetCreateActionsGroup: {
      display: 'flex',
      alignItems: 'center',
    },
    tweetCreateActionItem: {
      padding: '4px',
      fontSize: '20px',
    },
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
  }),
);

interface TweetCreateProps {
  userInfo: any;
}

export const TweetCreate: React.FC<TweetCreateProps> = ({
  userInfo,
}: TweetCreateProps): React.ReactElement => {
  const classes = useStyles();

  const [textProgress, setTextProgress] = useState<number>(0);
  const [tweetBtnDisabled, setTweetBtnDisabled] = useState<boolean>(true);
  const [tweetText, setTweetText] = useState<string>('');

  const letterLimit = 280;

  const changeProgress = () => {
    if (tweetText) setTextProgress((tweetText.length / letterLimit) * 100);
  };

  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget) {
      setTweetText(e.currentTarget.value);
      changeProgress();
    }

    if (e.currentTarget.value.length> 0 && tweetText.length <= letterLimit) {
      setTweetBtnDisabled(false);
    } else {
      setTweetBtnDisabled(true);
    }
  };

  const addTweet = () => {
    console.log('added');
    setTweetText('');
    setTweetBtnDisabled(true);
    setTextProgress(0);
  };

  return (
    <Paper className={classes.tweetItemRoot}>
      <Grid container spacing={2}>
        <Grid item xs={2} className={classes.tweetLeftSide}>
          <Avatar alt="User avatar" src={userInfo.avatarUrl} className={classes.userAvatar} />
        </Grid>
        <Grid item xs={10} className={classes.tweetRightSide}>
          <TextareaAutosize
            onInput={handleChangeTextarea}
            onKeyUp={handleChangeTextarea}
            className={classes.tweetEditField}
            placeholder="Что происходит?"
            value={tweetText}></TextareaAutosize>

          <div className={classes.tweetCreateActions}>
            <div className={classes.tweetCreateActionsGroup}>
              <IconButton className={classes.tweetCreateActionItem}>
                <ImageOutlinedIcon color="primary" />
              </IconButton>
              <IconButton className={classes.tweetCreateActionItem}>
                <GifOutlinedIcon color="primary" />
              </IconButton>
              <IconButton className={classes.tweetCreateActionItem}>
                <EqualizerOutlinedIcon color="primary" />
              </IconButton>
              <IconButton className={classes.tweetCreateActionItem}>
                <SentimentSatisfiedOutlinedIcon color="primary" />
              </IconButton>
              <IconButton className={classes.tweetCreateActionItem}>
                <DateRangeOutlinedIcon color="primary" />
              </IconButton>
            </div>

            <div className={classes.tweetCreateActionsRightWrap}>
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
              <Button
                onClick={addTweet}
                variant="contained"
                color="primary"
                disabled={tweetBtnDisabled}>
                Твитнуть
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
