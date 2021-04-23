import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {  Avatar, Button } from '@material-ui/core';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    RecomendationItemWrapper: {
      position: 'relative',
      padding: '19px 10px 14px 20px',
      display: 'flex',
    },
    RecomendationItemRight: {
      display: 'flex',
      flexGrow:1,
      alignItems:'center',
      justifyContent:'space-between',
    },
    RecomendationItemNameBLock: {
      marginLeft: '6px',
    },
    RecItemName: {
      fontSize: '15px',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        fontSize: '20px',
      },
    },
    RecItemLogin: {
      fontSize: '14px',
      fontWeight: 500,
    },
    RecItemButton: {
      padding: '1px 5px',
      height:'30px',
      '& span': {
        fontSize: '12px',
        fontWeight:600,
      },
    },
  }),
);

export const RecomendationItem = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.RecomendationItemWrapper}>
        <Avatar src="https://pbs.twimg.com/profile_images/1326313041449918464/P7tcCvdd_x96.jpg" />
        <div className={classes.RecomendationItemRight}>
          <div className={classes.RecomendationItemNameBLock}>
            <span className={classes.RecItemName}>
              100T Hiko <CheckCircleSharpIcon color="primary" />
            </span>
            <span className={classes.RecItemLogin}>@Hiko</span>
          </div>
          <Button variant="outlined" color="primary" className={classes.RecItemButton}>
            Читать
          </Button>
        </div>
      </div>
    );
  };