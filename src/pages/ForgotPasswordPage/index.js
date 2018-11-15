import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConnectedForgotPasswordForm from '../../containers/ForgotPasswordForm';
import NavBar from "../../containers/NavBar";
import Divider from "../../components/Divider";
import PreLoader from "../../components/PreLoader";

export function ForgotPasswordPage({ isRequesting }) {
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col s8 offset-s2 m6  offset-m3 l4 offset-l4">
          <div className="card">
            <div className="card-title">
              <h4>Reset password</h4>
            </div>
            {isRequesting ? <PreLoader horizontal /> : <Divider />}
            <div className="card-content">
              <ConnectedForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ForgotPasswordPage.propTypes = {
  isRequesting: PropTypes.bool,
};

ForgotPasswordPage.defaultProps = {
  isRequesting: false,
};

const mapStateToProps = ({ forgotPassword }) => forgotPassword;

export default connect(mapStateToProps, null)(ForgotPasswordPage);
