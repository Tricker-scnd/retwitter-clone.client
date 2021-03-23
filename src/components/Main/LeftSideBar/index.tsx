import React from 'react';
import { Button, Hidden, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ListAltIcon from '@material-ui/icons/ListAltOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlineOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHorizOutlined';
import MessageIcon from '@material-ui/icons/Message';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import { TweetCreate } from '../Tweet/create';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainLogo: {
      fontSize: '40px',
    },
    logoButton: {
      margin: '0 auto',
      [theme.breakpoints.down('xs')]: {
        padding: '0px',
        marginLeft: '10px',
      },
    },
    modal: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '30px',
    },
    menuIcon: {
      fontSize: '30px',
      color: '#333',
      transition: '0.1s all',
      '&:hover': {
        color: theme.palette.primary.main,
      },
      marginRight: '16px',

      [theme.breakpoints.down('sm')]: {
        marginRight: '0px',
      },
    },

    leftMenuLinks: {
      listStyle: 'none',
      margin: '0',
      padding: '0px 6px 0px 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',

      [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
      },
    },
    letfMenuLinksItem: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      cursor: 'pointer',
      transition: '0.2s all',
      borderRadius: '18px',
      padding: '12px 14px 10px 12px',
      marginBottom: '4px',
      [theme.breakpoints.down('sm')]: {
        padding: '6px 7px 6px 7px',
      },

      '&:first-child': {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
          padding: '0px',
        },
      },
      '&:first-child:hover': {
        backgroundColor: 'rgba(0,0,0,0)',
      },
      '&:hover': {
        backgroundColor: 'rgba(98,160,160,0.12)',
        color: theme.palette.primary.main,
      },
      '&:hover svg': {
        color: theme.palette.primary.main,
      },
      '& h6': {
        fontSize: '19px',
        fontWeight: 700,
      },
      '& a': {
        display: 'flex',
      },
    },
    letfMenuItemAction: {
      display: 'flex',
      width: '100%',
      marginTop: '18px',
      justifyContent: 'center',
    },
    letfMenuLinksItemTweetBtn: {
      width: '90%',
      padding: '7px 0px',

      [theme.breakpoints.down('sm')]: {
        padding: '7px 9px',
      },
      [theme.breakpoints.down('xs')]: {
        width: '70px',
        padding: '5px 2px',
      },
    },
    leftGridColumnWrapper: {
      top: 0,
      position: 'sticky',

      '& span': {
        textTransform: 'none',
        fontSize: '17px',
        fontWeight: 600,

        [theme.breakpoints.down('xs')]: {
          fontSize: '13px',
        },
      },
    },

    createTweetModalWrapper: {
      padding: '10px 0px 30px 0px',
      borderRadius: '10px',
      outline: 'none',
      backgroundColor: '#fff',
      width: '550px',
      '& > div': {
        borderBottom: 'none',
        maxHeight: '400px',
        overflowY: 'scroll',

        '&::-webkit-scrollbar': {
          width: '0.6em',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.4)',
          outline: 'none',
          borderRight: '2px solid #fff',

        },
      },
      '& hr': {
        border: 'none',
        height: '1px',
        backgroundColor: '#dcdcdc',
      },
      '& > button': {
        marginLeft: '20px',
      },
    },
  }),
);

interface SideBarMenuProps {
  userInfo: any;
}

export const SideBarMenu: React.FC<SideBarMenuProps> = ({
  userInfo,
}: SideBarMenuProps): React.ReactElement => {
  const classes = useStyles();

  const [visibleAddPopup, setVisibleAddPopup] = React.useState(false);

  const openAddTweetPopup = () => {
    setVisibleAddPopup(true);
  };
  const closeAddTweetPopup = () => {
    setVisibleAddPopup(false);
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={visibleAddPopup}
        onClose={closeAddTweetPopup}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={visibleAddPopup}>
          <div className={classes.createTweetModalWrapper}>
            <IconButton onClick={closeAddTweetPopup}>
              <CloseIcon color="primary" />
            </IconButton>
            <hr></hr>
            <TweetCreate userInfo={userInfo} />
            <hr></hr>
          </div>
        </Fade>
      </Modal>

      <div className={classes.leftGridColumnWrapper}>
        <ul className={classes.leftMenuLinks}>
          <li className={classes.letfMenuLinksItem}>
            <IconButton aria-label="Logo" className={classes.logoButton}>
              <Link to="/">
                <MessageIcon color="primary" className={classes.mainLogo} />
              </Link>
            </IconButton>
          </li>
          <li className={classes.letfMenuLinksItem}>
            <HomeRoundedIcon color="primary" className={classes.menuIcon} />
            <Hidden smDown>
              <Typography variant="h6">Главная</Typography>
            </Hidden>
          </li>
          <li className={classes.letfMenuLinksItem}>
            <SearchRoundedIcon color="primary" className={classes.menuIcon} />
            <Hidden smDown>
              <Typography variant="h6">Поиск</Typography>
            </Hidden>
          </li>
          <li className={classes.letfMenuLinksItem}>
            <NotificationsIcon color="primary" className={classes.menuIcon} />
            <Hidden smDown>
              <Typography variant="h6">Уведомления</Typography>
            </Hidden>
          </li>
          <li className={classes.letfMenuLinksItem}>
            <EmailIcon color="primary" className={classes.menuIcon} />
            <Hidden smDown>
              <Typography variant="h6">Сообщения</Typography>
            </Hidden>
          </li>
          <li className={classes.letfMenuLinksItem}>
            <BookmarkBorderIcon color="primary" className={classes.menuIcon} />
            <Hidden smDown>
              <Typography variant="h6">Закладки</Typography>
            </Hidden>
          </li>
          <li className={classes.letfMenuLinksItem}>
            <ListAltIcon color="primary" className={classes.menuIcon} />
            <Hidden smDown>
              <Typography variant="h6">Списки</Typography>
            </Hidden>
          </li>
          <li className={classes.letfMenuLinksItem}>
            <PersonIcon color="primary" className={classes.menuIcon} />
            <Hidden smDown>
              <Typography variant="h6">Профиль</Typography>
            </Hidden>
          </li>
          <li className={classes.letfMenuLinksItem}>
            <MoreHorizIcon color="primary" className={classes.menuIcon} />
            <Hidden smDown>
              <Typography variant="h6">Еще</Typography>
            </Hidden>
          </li>
          <li className={classes.letfMenuItemAction}>
            <Button
              onClick={openAddTweetPopup}
              variant="contained"
              color="primary"
              className={classes.letfMenuLinksItemTweetBtn}>
              Твитнуть
            </Button>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
