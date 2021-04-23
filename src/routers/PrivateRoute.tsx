import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { selectAuthorizeStatus } from '../store/ducks/currentUser/selectors';

export const PrivateRoute = ({ component, reverse, ...rest }: any) => {
  const isAuth = useSelector(selectAuthorizeStatus);
  return (
    <>
      {reverse ? (
        <>
          {(isAuth === 'unsigned' || isAuth === 'error') && (
            <Route component={component} {...rest} />
          )}
          {isAuth === 'success' && <Redirect to="/" />}
        </>
      ) : (
        <>
          {isAuth === 'success' && <Route component={component} {...rest} />}
          {(isAuth === 'unsigned' || isAuth === 'error') && <Redirect to="/signing" />}
        </>
      )}
    </>
  );
};
