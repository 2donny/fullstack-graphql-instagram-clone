import { useReactiveVar } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { isLoggedInVar, darkModeVar } from './Apollo';
import { darkTheme, lightTheme, GlobalStyles } from './styles/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Login />}
        </Route>
        <Route path="/sign-up" component={SignUp}/>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
