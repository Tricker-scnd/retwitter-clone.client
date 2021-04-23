import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { SignIn } from './pages/SignIn';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useAuth } from './hooks/Auth.hook';
import { PrivateRoute } from './routers/PrivateRoute';
import { ActivatePage } from './pages/components/ActivatePage';

function App() {
  const { checkUser } = useAuth();
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <PrivateRoute path="/signing" reverse={true} component={SignIn} />
          <Route path="/auth/verify/:hash" component={ActivatePage} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
