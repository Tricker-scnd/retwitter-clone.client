import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { addTweet } from '../../../../store/ducks/tweets/actionCreators';
import Snackbar from '@material-ui/core/Snackbar';
import { selectAddTweetLoadingState } from '../../../../store/ducks/tweets/selectors';
import { LoadingState } from '../../../../store/ducks/actualThemes/contracts/state';
import CloseIcon from '@material-ui/icons/Close';
import { selectCurrentUserInfo } from '../../../../store/ducks/currentUser/selectors';
import { ActionsGroup } from './components/ActionsGroup';
import { SubmitButton } from './components/SubmitButton';
import { NotificationAlert } from '../../common/NotificationAlert';
import { ImagesAttachmentBlock } from './components/ImagesAttachmentBlock';

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
      maxHeight: 'unset',
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
    tweetAttachmentsBlock: {
      display: 'flex',
      border: 'none !important',
    },
  }),
);

interface attachmentDataInterface {
  images: object[];
}

export const TweetCreate: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [textProgress, setTextProgress] = useState<number>(0);
  const [tweetBtnDisabled, setTweetBtnDisabled] = useState<boolean>(true);
  const [tweetText, setTweetText] = useState<string>('');
  const [attachmentData, setAttachmentData] = useState<attachmentDataInterface>({ images: [] });

  const [notification, setNotification] = useState(false);
  const [displayImagesAttach, setDisplayImagesAttach] = useState<Blob[]>([]);
  const letterLimit = 280;
  const imagesLimit = 4;

  // ------- TWEET TEXT -------------
  const addTweetStateError =
    useSelector(selectAddTweetLoadingState) === LoadingState.ERROR ? true : false;

  useEffect(() => {
    setNotification(addTweetStateError);
  }, [addTweetStateError]);

  const changeProgress = () => {
    if (tweetText) setTextProgress((tweetText.length / letterLimit) * 100);
  };

  const handleChangeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget) {
      setTweetText(e.currentTarget.value);
      changeProgress();
    }
    if (e.currentTarget.value.length > 0 && tweetText!.length <= letterLimit) {
      setTweetBtnDisabled(false);
    } else {
      setTweetBtnDisabled(true);
    }
  };
  // ------- /TWEET TEXT -------------

  // ------ TWEET ATTACHMENTS---------

  const addImageAttach = (newImage: Blob, fileImg: object) => {
    setDisplayImagesAttach((prev) => [...prev, newImage]);
    setAttachmentData((prev) => ({ ...prev, images: [...prev.images, fileImg] }));
  };
  const removeImageAttach = (index: number) => {
    setAttachmentData((prev) => ({ ...prev, images: prev.images.filter((_, i) => index !== i) }));
    setDisplayImagesAttach((prev) => prev.filter((_, i) => index !== i));
  };

  // ------ /TWEET ATTACHMENTS--------

  const clear = () => {
    setAttachmentData({ images: [] });
    setDisplayImagesAttach([]);
    setTweetText('');
    setTweetBtnDisabled(true);
    setTextProgress(0);
  };

  const AddTweetHandle = () => {
    dispatch(addTweet({ text: tweetText, images: attachmentData.images }));
    clear();
  };

  const userInfo = useSelector(selectCurrentUserInfo);
  return (
    <>
      <Paper className={classes.tweetItemRoot}>
        <Grid container spacing={2}>
          <Grid item xs={2} className={classes.tweetLeftSide}>
            <Avatar alt="User avatar" src={userInfo?.avatarSrc} className={classes.userAvatar} />
          </Grid>
          <Grid item xs={10} className={classes.tweetRightSide}>
            <TextareaAutosize
              onInput={handleChangeTextarea}
              onKeyUp={handleChangeTextarea}
              className={classes.tweetEditField}
              placeholder="Что происходит?"
              value={tweetText}></TextareaAutosize>

            <ImagesAttachmentBlock
              images={displayImagesAttach}
              removeImageAttach={removeImageAttach}
            />

            <div className={classes.tweetCreateActions}>
              <ActionsGroup
                handleImageAttach={addImageAttach}
                imagesButtonDisabled={displayImagesAttach.length === imagesLimit}
              />

              <SubmitButton
                tweetText={tweetText}
                letterLimit={letterLimit}
                textProgress={textProgress}
                AddTweetHandle={AddTweetHandle}
                tweetBtnDisabled={tweetBtnDisabled}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>

      <NotificationAlert
        notification={notification}
        handleClose={() => setNotification(false)}
        message={'Что-то пошло не так :('}
      />
    </>
  );
};
