import React from 'react';
import { useSelector } from 'react-redux';
import history from "@history";
import { Router } from "react-router";
import { Switch, Route, Redirect } from 'react-router-dom';
import pageAccess from 'app/auth/AuthorizationRoles';
import MainPage from 'app/main/pages/main-page/MainPage';
import UsersPage from 'app/main/pages/users/UsersPage';
import UsersDetailsPage from 'app/main/pages/users/UsersDetailsPage';
import CouriersPage from 'app/main/pages/couriers/CouriersPage';
import includes from 'lodash/includes';
import WorkOrdersPage from 'app/main/pages/workOrders/WorkOrdersPage';
import WorkOrdersDetailsPage from 'app/main/pages/workOrders/WorkOrdersDetailsPage';
import PaymentsPage from 'app/main/pages/payments/PaymentsPage';
import CouriersDetailsPage from 'app/main/pages/couriers/CouriersDetailsPage';
import ConfigurationPage from 'app/main/pages/configuration/ConfigurationPage';
import NotFoundPage from 'app/main/pages/not-found/NotFoundPage';

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
        <PrivateRoute auth={pageAccess.users} exact path="/users/:userId" component={UsersDetailsPage} />
        <PrivateRoute auth={pageAccess.couriers} exact path="/couriers" component={CouriersPage} />
        <PrivateRoute auth={pageAccess.couriers} exact path="/couriers/:courierId" component={CouriersDetailsPage} />
        <PrivateRoute auth={pageAccess.workOrders} exact path="/workOrders" component={WorkOrdersPage} />
        <PrivateRoute auth={pageAccess.workOrders} exact path="/workOrders/:workOrderId" component={WorkOrdersDetailsPage} />
        <PrivateRoute auth={pageAccess.payments} exact path="/payments" component={PaymentsPage} />
        <PrivateRoute auth={pageAccess.config} exact path="/configuration" component={ConfigurationPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default Routes