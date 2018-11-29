import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ROUTES from '../../utils/routes';
import './NavBar.scss';
import profile from '../../assets/images/profile.jpg';
import DropDown from '../../components/DropDown';
import PreLoader from '../../components/PreLoader';
import DropDownItem from '../../components/DropDownItem';
import { getCurrentUser } from '../../utils/auth';
import MenuItem from './MenuItem';
import Menu from './Menu';

class NavBar extends React.Component {
  state ={
    hiddenLoader: false,
  };

  getProfileDropDown = () => (
    <DropDown
      id="profile-dropdown"
      list={(
        <>
          <DropDownItem link={ROUTES.articles.createNew}>
            New Article
          </DropDownItem>
          <DropDownItem link={ROUTES.profiles.view} classNames="divided top">
            My Profile
          </DropDownItem>
          <DropDownItem link={ROUTES.me.articles}>
            My Articles
          </DropDownItem>
          <DropDownItem link={ROUTES.me.stats}>
            My Stats
          </DropDownItem>
          <DropDownItem link={ROUTES.settings}>
            Settings
          </DropDownItem>
          <DropDownItem onClick={this.logout}>
            Logout
          </DropDownItem>
        </>
      )}
    />
  );

  logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  getAuthenticatedMenu = user => (
    <>
      <MenuItem link="" icon="search" />
      <MenuItem link="" icon="notifications" />
      <MenuItem
        iconImage={user.image || profile}
        dropDown={this.getProfileDropDown()}
      />
      </>
  );


  getMenu = user => (
    <Menu right>
      {
        user ? this.getAuthenticatedMenu(user)
          : (
            <>
              <MenuItem link={ROUTES.auth.login}>
                Login
              </MenuItem>
            </>
          )
      }
    </Menu>
  );

  componentWillReceiveProps = (nextProps) => {
    const { isPageLoading } = nextProps;
    if (isPageLoading) {
      this.setState({ hiddenLoader: false });
    } else {
      setTimeout(() => {
        /* istanbul ignore next */
        this.setState({ hiddenLoader: true });
      }, 500);
    }
  };

  showProgress= (pageLoading) => {
    const { hiddenLoader } = this.state;

    const loader = (
      <PreLoader
        determinate
        progress={pageLoading ? 50 : 100}
        horizontal
        classNames={(hiddenLoader) && 'hidden'}
      />
    );
    return loader;
  };

  render() {
    const { user: propsUser } = this.props;
    const user = getCurrentUser() || propsUser;
    const { isPageLoading, left, right } = this.props;

    return (
      <>
        { this.showProgress(isPageLoading) }
        <nav className="white black-text">
          <div className="container">
            <div className="nav-wrapper">
              {left}
              <a
                href={ROUTES.index}
                className="brand-logo center black-text logo"
              >
                {'Author\'s Haven'}
              </a>
              <div className="right">
                {
                  right
                }
                {this.getMenu(user)}
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
NavBar.defaultProps = {
  isPageLoading: false,
  left: null,
  right: null,
};

NavBar.propTypes = {
  isPageLoading: PropTypes.bool,
  left: PropTypes.shape(),
  right: PropTypes.shape(),
  user: PropTypes.shape({}).isRequired,
};


const mapStateToProps = pageProgress => pageProgress;

export default connect(mapStateToProps, null)(NavBar);
