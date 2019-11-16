import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import pageAccess from 'app/auth/AuthorizationRoles';
import MainPage from 'app/main/pages/main-page/MainPage';
import UsersPage from 'app/main/pages/users/UsersPage';
import CourriersPage from 'app/main/pages/courriers/CourriersPage';
import includes from 'lodash/includes';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { role } = useSelector(({ bk }) => bk.user)
  const auth = rest.auth
  return (
    <Route
      {...rest}
      render={props => includes(auth, role) ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )}
    />
  )
}

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <PrivateRoute auth={pageAccess.users} exact path="/users" component={UsersPage} />
        <PrivateRoute auth={pageAccess.courriers} exact path="/courriers" component={CourriersPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes