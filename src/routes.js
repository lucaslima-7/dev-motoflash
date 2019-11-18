import React from 'react';
import { useSelector } from 'react-redux';
import history from "@history";
import { Router } from "react-router";
import { Switch, Route, Redirect } from 'react-router-dom';
import pageAccess from 'app/auth/AuthorizationRoles';
import MainPage from 'app/main/pages/main-page/MainPage';
import UsersPage from 'app/main/pages/users/UsersPage';
import CouriersPage from 'app/main/pages/couriers/CouriersPage';
import includes from 'lodash/includes';
import LocationPage from 'app/main/pages/location/LocationPage';
import TripsPage from 'app/main/pages/trips/TripsPage';
import PaymentsPage from 'app/main/pages/payments/PaymentsPage';

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
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <PrivateRoute auth={pageAccess.users} exact path="/users" component={UsersPage} />
        <PrivateRoute auth={pageAccess.couriers} exact path="/couriers" component={CouriersPage} />
        <PrivateRoute auth={pageAccess.location} exact path="/location" component={LocationPage} />
        <PrivateRoute auth={pageAccess.trips} exact path="/trips" component={TripsPage} />
        <PrivateRoute auth={pageAccess.payments} exact path="/payments" component={PaymentsPage} />
        <Route path="*" component={MainPage} />
      </Switch>
    </Router>
  )
}

export default Routes