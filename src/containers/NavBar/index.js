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
  getProfileDropDown = () => (
    <DropDown
      id="profile-dropdown"
      list={(
        <DropDownItem>
          Home
        </DropDownItem>
      )}
    />
  );

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
              <MenuItem link={ROUTES.login}>
                Login
              </MenuItem>
            </>
          )
      }
    </Menu>
  );

  render() {
    const user = getCurrentUser();
    const { isPageLoading, left, right } = this.props;
    return (
      <>
        {isPageLoading
          ? (
            <PreLoader horizontal />
          ) : null
        }
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
};


const mapStateToProps = pageProgress => pageProgress;

export default connect(mapStateToProps, null)(NavBar);
