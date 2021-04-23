import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import GifOutlinedIcon from '@material-ui/icons/GifOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tweetCreateActionsGroup: {
      display: 'flex',
      alignItems: 'center',
    },
    tweetCreateActionItem: {
      padding: '4px',
      fontSize: '20px',
      position: 'relative',
      overflow: 'hidden',

      '&:disabled': {
        opacity: '0.4',
      },
    },
    inputFile: {
      position: 'absolute',
      opacity: '0',
      height: '100%',
      cursor: 'pointer',
    },
  }),
);

interface ActionsGroupProps {
  handleImageAttach: (img: Blob, file: object) => void;
  imagesButtonDisabled: boolean;
}

export const ActionsGroup = ({ handleImageAttach, imagesButtonDisabled }: ActionsGroupProps) => {
  const classes = useStyles();

  const inputImage = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const fileBlob = new Blob([file]);
      handleImageAttach(fileBlob, file);
    }
  };

  return (
    <>
      <div className={classes.tweetCreateActionsGroup}>
        <IconButton className={classes.tweetCreateActionItem} disabled={imagesButtonDisabled}>
          <input type="file" onChange={inputImage} className={classes.inputFile} />
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
    </>
  );
};
