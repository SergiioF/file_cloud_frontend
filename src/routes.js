import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./services/auth";

import Main from './pages/Main';
import MainSub from './pages/MainSubB';
import Box from './pages/Box';
import Videos from './pages/Videos';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <PrivateRoute path='/main' exact component={Main} />
            <PrivateRoute path='/subbox' exact component={MainSub} />
            <PrivateRoute path='/subbox/:id' exact component={Videos} />
            <PrivateRoute path='/box' exact component={Box} />
            <PrivateRoute path='/box/:id' exact component={Box} />
            <Route path='/forgot_password' exact component={ForgotPassword} />
            <Route path='/reset_password/:link' exact component={ResetPassword} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>

)

export default Routes;
