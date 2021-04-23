import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MainTopBar } from '../../components/Main/common/MainTopBar';
import { Container, Tab, Tabs } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentUserInfo,
  selectSubscribersList,
  selectSubscriptionsList,
} from '../../store/ducks/currentUser/selectors';
import { getSubs, getSubscriptions } from '../../store/ducks/currentUser/actionCreators';
import { UserItem } from '../../components/Main/common/UserItem';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    TweetsLoader: {
      display: 'block',
      margin: '20px auto',
    },
    favoritesTitle: {
      margin: '15px 0 15px 25px',
    },
    usersTabsContainer: {
      width: '100%',
    },
    usersTabs: {
      width: '100%',
      display: 'flex',
    },
    usersTab: {
      flexBasis: '50%',
      maxWidth: 'unset',
    },
    usersContainer: {
      borderTop: '1px solid rgba(0,0,0,0.04)',
    },
  }),
);

export const UsersPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabPage, setTabPage] = useState(0);
  const currentUser = useSelector(selectCurrentUserInfo);
  const handleChange = (event: any, newValue: number) => {
    setTabPage(newValue);
  };

  useEffect(() => {
    if (currentUser && tabPage === 0) dispatch(getSubscriptions(currentUser._id));
    if (currentUser && tabPage === 1) dispatch(getSubs(currentUser._id));
  }, [dispatch, tabPage, currentUser]);

  const subs = useSelector(selectSubscribersList);
  const subscriptions = useSelector(selectSubscriptionsList);

  return (
    <>
      <MainTopBar text={`Списки пользователей`} arrowBack={true} />

      <>
        <div className={classes.usersTabsContainer}>
          <Tabs
            value={tabPage}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            className={classes.usersTabs}>
            <Tab label="Вы читаете" className={classes.usersTab} />
            <Tab label="Ваши читатели" className={classes.usersTab} />
          </Tabs>
        </div>
        <Container className={classes.usersContainer}>
          {tabPage === 0 && (
            <div>
              {subscriptions.map((u, i) => (
                <Link key={u._id} to={`/${u.login}`}>
                  <UserItem userInfo={u} />
                </Link>
              ))}
            </div>
          )}
          {tabPage === 1 && (
            <div>
              {subs.map((u, i) => (
                <Link key={u._id} to={`/${u.login}`}>
                  <UserItem userInfo={u} />
                </Link>
              ))}
            </div>
          )}
        </Container>
      </>
    </>
  );
};
