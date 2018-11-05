import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import ROUTES from '../utils/routes';
import { getCurrentUser } from '../utils/auth';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';
import CreateUpdate from '../pages/Articles/CreateUpdate';
import Read from '../pages/Articles/Read';

export class AuthenticatedRoute extends Component {
  constructor(props) {
    super(props);
    this.user = getCurrentUser();
    this.isAuthenticated = this.user != null;
  }

  renderIfNotAuthenticated(component) {
    const { path } = this.props;
    return (
      path === ROUTES.login || path === ROUTES.register
        ? (this.renderComponent(component))
        : (<Redirect to={{ pathname: ROUTES.login }} />)
    );
  }

  renderIfAuthenticated(component) {
    const { path, location } = this.props;
    return (
      path === ROUTES.login || path === ROUTES.register ? (
        <Redirect
          to={{ pathname: ROUTES.index, state: { from: location } }}
        />
      ) : (
        this.renderComponent(component)
      )
    );
  }

  renderComponent = component => component

  render() {
    const { component: Comp, ...otherProps } = this.props;
    return (
      <Route
        {...otherProps}
        render={props => (
          this.isAuthenticated
            ? this.renderIfAuthenticated(<Comp {...props} user={this.user} />)
            : this.renderIfNotAuthenticated(<Comp {...props} user={this.user} />)
        )}
      />
    );
  }
}

export default () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.index} component={HomePage} />
      <AuthenticatedRoute
        exact
        path={ROUTES.login}
        component={LoginPage}
      />
      <AuthenticatedRoute
        exact
        path={ROUTES.register}
        component={SignUpPage}
      />
      <AuthenticatedRoute
        exact
        path={ROUTES.articles.createOrRead}
        component={CreateUpdate}
      />
      <AuthenticatedRoute
        exact
        path={ROUTES.articles.createOrRead}
        component={Read}
      />
      <AuthenticatedRoute
        exact
        path={ROUTES.articles.update}
        component={CreateUpdate}
        updateArticle
      />
    </Switch>
  </Router>
);

AuthenticatedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
