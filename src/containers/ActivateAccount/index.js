import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import activate from './state/actions';
import { getQueryParam } from '../../utils/helpers';
import ROUTES from '../../utils/routes';

const token = getQueryParam('token');
const uid = getQueryParam('uid');

class ActivateAccount extends React.Component {
  componentDidMount() {
    const { activateUser } = this.props;
    activateUser(token, uid);
  }

  onClick = () => {
    window.location.reload();
  };

  state = {};

  showProgress = () => (
    <div className="progress">
      <div className="indeterminate" />
    </div>
  );

  activationSuccessful = () => (
    <div className="center-align">
      <h6 className="green-text">Your account has been activated</h6>
      <div className="center-align">
        <button type="submit" className="btn-bordered">
          <Link to={ROUTES.login}>Login</Link>
        </button>
      </div>
    </div>
  );

  activationFailed = () => (
    <div className="center-align">
      <h6>Something Went wrong! Try again</h6>
      <button type="submit" className="btn-bordered" onClick={this.onClick}>
        Try again
      </button>
    </div>
  );

  render() {
    const {
      isActivating,
      activationSuccess,
      activationFailed,
    } = this.props;
    return (
      <div>
        <nav className="white black-text">
          <div className="container">
            <div className="nav-wrapper">
              <a href={ROUTES.index} className="brand-logo center black-text logo">{'Author\'s Haven'}</a>
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col m4 offset-m4" style={{ paddingTop: '30px' }}>
            <div className="card white darken-1" id="myDiv">
              { isActivating && this.showProgress() }
              <div className="card-content black-text">
                { activationSuccess && this.activationSuccessful() }
                <h6>{ activationFailed && this.activationFailed() }</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ActivateAccount.propTypes = {
  activateUser: PropTypes.func.isRequired,
  isActivating: PropTypes.bool.isRequired,
  activationSuccess: PropTypes.bool.isRequired,
  activationFailed: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ activateAccount }) => activateAccount;

export default connect(mapStateToProps, { activateUser: activate })(ActivateAccount);
