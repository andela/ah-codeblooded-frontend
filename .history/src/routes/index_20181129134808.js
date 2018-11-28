import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PropTypes from 'prop-types';
import AuthPage from "../pages/AuthPage";
import ROUTES from '../utils/routes';
import { getCurrentUser } from '../utils/auth';
import ConnectedForgotPasswordPage from '../pages/ForgotPasswordPage';
import ConnectedResetPasswordPage from '../pages/ResetPasswordPage';
import HomePage from '../pages/HomePage';
import Create from '../pages/Articles/Create';
import Update from '../pages/Articles/Update';
import Read from '../pages/Articles/Read';
import MyArticles from '../components/MyArticles';
import ProfilePage from '../pages/ProfilesPage';
import PageNotFound from '../pages/Error404Page';
import Activate from '../containers/ActivateAccount';
import SettingsPage from '../pages/Settings';
import ConnectedStatsPage from "../pages/StatsPage";
import Search from '../pages/Search';

export class AuthenticatedRoute extends Component {
  constructor(props) {
    super(props);
    this.user = getCurrentUser();
    this.isAuthenticated = this.user != null;
  }

  renderIfNotAuthenticated(component) {
    const { path } = this.props;
    return path === ROUTES.auth.login
      || path === ROUTES.auth.register ? (
        this.renderComponent(component)
      ) : (
        <Redirect to={{ pathname: ROUTES.auth.login }} />
      );
  }

  renderIfAuthenticated(component) {
    const { path, location } = this.props;
    return path === ROUTES.auth.login || path === ROUTES.auth.register ? (
      <Redirect to={{ pathname: ROUTES.index, state: { from: location } }} />
    ) : (
      component
    );
  }

  renderComponent = component => component;

  render() {
    const { component: Comp, ...otherProps } = this.props;
    return (
      <Route
        {...otherProps}
        render={props => (this.isAuthenticated
          ? this.renderIfAuthenticated(<Comp {...props} user={this.user} />)
          : this.renderIfNotAuthenticated(
            <Comp {...props} user={this.user} />,
          ))
        }
      />
    );
  }
}

export default () => (
  <Router>
    <Switch>
      <Route exact path={ROUTES.index} component={HomePage} />
      <Route
        exact
        path={ROUTES.forgotPassword}
        component={ConnectedForgotPasswordPage}
      />
      <Route
        exact
        path={ROUTES.resetPassword}
        component={ConnectedResetPasswordPage}
      />
      <AuthenticatedRoute
        exact
        path={ROUTES.articles.create}
        component={Create}
      />
      <Route
        exact
        path={ROUTES.articles.read}
        component={Read}
      />
      <AuthenticatedRoute
        exact
        path={ROUTES.articles.update}
        component={Update}
        updateArticle
      />
      <Route
        exact
        path={ROUTES.activate}
        component={Activate}
      />
      <AuthenticatedRoute
        exact
        path={ROUTES.me.articles}
        component={MyArticles}
      />
      <AuthenticatedRoute
        exact
        path={ROUTES.profiles.view}
        component={ProfilePage}
      />
      <AuthenticatedRoute exact path={ROUTES.auth.login} component={AuthPage} />
      <AuthenticatedRoute exact path={ROUTES.auth.register} component={AuthPage} />
      <Route
        exact
        path={ROUTES.settings}
        component={SettingsPage}
      />
<<<<<<< HEAD
      <AuthenticatedRoute
        exact
        path={ROUTES.me.stats}
        component={ConnectedStatsPage}
      />
      <Route
        exact
        path={ROUTES.search}
        component={Search}
      />
=======
      <Route path="*" component={PageNotFound} />
>>>>>>> chore(render 404 page): render 404 page when user goes to unknown path
    </Switch>
  </Router>
);

AuthenticatedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
