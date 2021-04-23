import React, { useEffect, useState } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { AuthApi } from '../../services/api/AuthApi';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: '100vh',
    backgroundColor: 'rgb(60, 101, 101)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: '10px 25px',
    '& a': {
      textDecoration: 'none',
    },
  },
  paperBtn: {
    marginLeft: 'auto',
    display: 'block',
  },
}));

export const ActivatePage = () => {
  const classes = useStyles();
  const [verifyError, serVerifyError] = useState(false);
  let params: { hash: string } = useParams();
  const hash = params?.hash.split('=')[1];
  useEffect(() => {
    AuthApi.ActivateAccount(hash).then(
      (result) => result.status !== 'success' && serVerifyError(true),
    );
  }, []);

  useEffect(() => {}, []);
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.paper}>
        <h3>{verifyError ? 'Что-то пошло не так :(' : 'Ваша учетная запись активирована'}</h3>
        <Link to="/signing">
          <Button variant="contained" color="primary" className={classes.paperBtn}>
            Ок
          </Button>
        </Link>
      </Paper>
    </div>
  );
};
