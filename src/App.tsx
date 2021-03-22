import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { SignIn } from './pages/SignIn';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Switch>
          <Route path="/signing" component={SignIn} />
          <Route path="/" component={Home} />
        </Switch>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
