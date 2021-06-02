import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { isLoggedInVar } from './Apollo';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Login />}
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
