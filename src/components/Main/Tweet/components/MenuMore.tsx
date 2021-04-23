import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import { IconButton } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { pinState } from '../../../../store/ducks/tweet/contracts/state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tweetMoreActionsButton: {
      marginTop: '-6px',
      padding: '6px',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    moreActionsMenuIcon: {
      fontSize: '16px',
      marginRight: '8px',
      fontWeight: 400,
    },
  }),
);

interface menuMoreProps {
  ownTweet: boolean;
  handleDeleteTweet: Function;
  pinTweet: (e: any, id: string, t: pinState) => void;
  pinnedInfo: { pinned: boolean; id: string };
  openPinNotification: () => void;
}

export const MenuMore = ({
  ownTweet,
  handleDeleteTweet,
  pinTweet,
  pinnedInfo,
  openPinNotification,
}: menuMoreProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const deleteClick = (event: any) => {
    handleDeleteTweet();
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        className={classes.tweetMoreActionsButton}
        onClick={handleClick}>
        <MoreHorizRoundedIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {!ownTweet ? (
          <div>
            <MenuItem onClick={handleClose}>
              <SentimentVeryDissatisfiedIcon className={classes.moreActionsMenuIcon} />
              Мне не интересен этот твит
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <PersonAddDisabledIcon className={classes.moreActionsMenuIcon} /> Перестать читать
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              onClick={(e) => {
                pinTweet(e, pinnedInfo.id, pinnedInfo.pinned ? pinState.UNPIN : pinState.PIN);
                openPinNotification();
                setAnchorEl(null);
              }}>
              <KeyboardReturnIcon className={classes.moreActionsMenuIcon} />
              Закрепить твит
            </MenuItem>
            <MenuItem onClick={deleteClick}>
              <DeleteOutlineOutlinedIcon className={classes.moreActionsMenuIcon} />
              Удалить твит
            </MenuItem>
          </div>
        )}
      </Menu>
    </>
  );
};
