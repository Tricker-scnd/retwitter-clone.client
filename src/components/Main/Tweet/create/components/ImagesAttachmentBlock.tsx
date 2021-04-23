import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tweetAttachmentsBlock: {
      display: 'flex',
      border: 'none !important',
      flexWrap: 'wrap',
    },
    tweetAttachmentsImageItem: {
      position: 'relative',
      marginRight: '20px',
      marginTop: '15px',
      width: '150px',
      height: '150px',
      display: 'flex',
      backgroundColor: 'rgba(0,0,0,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    attachImage: {
      maxHeight: '150px',
      maxWidth: '150px',
      boxShadow: ' 0 0 5px rgba(0,0,0,0.1)',
    },
    attachRemoveButton: {
      position: 'absolute',
      right: '0px',
      top: '0px',
      width: '30px',
      height: '30px',
      transform: 'translate(44%, -50%)',
      backgroundColor: 'rgba(0,0,0,0.01)',
    },
    RemoveIcon: {},
  }),
);

interface ImagesAttachmentBlockProps {
  images: Blob[];
  removeImageAttach: (index: number) => void;
}

export const ImagesAttachmentBlock = ({
  images,
  removeImageAttach,
}: ImagesAttachmentBlockProps) => {
  const classes = useStyles();

  return (
    <div className={classes.tweetAttachmentsBlock}>
      {images &&
        images.map((url, index) => (
          <div className={classes.tweetAttachmentsImageItem} key={'image' + index}>
            <IconButton
              aria-label="repost"
              onClick={() => removeImageAttach(index)}
              className={classes.attachRemoveButton}>
              <CloseIcon className={classes.RemoveIcon} />
            </IconButton>
            <img
              src={URL.createObjectURL(url)}
              className={classes.attachImage}
              alt="uploaded i m a g e"
            />
          </div>
        ))}
    </div>
  );
};
