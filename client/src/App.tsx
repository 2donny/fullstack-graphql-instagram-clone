import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { client, isLoggedInVar, darkModeVar } from './graphql/Apollo';
import { darkTheme, lightTheme, GlobalStyles } from './styles/styles';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import routes from './routes';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Switch>
            <Route path={routes.home} exact>
              {isLoggedIn ? <Home /> : <Login />}
            </Route>
            {!isLoggedIn ? (
              <Route path="/sign-up">
                <SignUp />
              </Route>
            ) : null}
            <Route path="/users/:username">
              <Profile />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
