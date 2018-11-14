import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ConnectedResetPasswordForm from '../../containers/ResetPasswordForm';
import './ResetPasswordPage.scss';
import Divider from "../../components/Divider";
import PreLoader from "../../components/PreLoader";
import NavBar from "../../containers/NavBar";

export const ResetPasswordPage = ({ isRequesting }) => (
  <div>
    <NavBar />
    <div className="row">
      <div className="col s8 offset-s2 m6  offset-m3 l4 offset-l4">
        <div className="card">
          <div className="card-title">
            Reset password
          </div>
          {isRequesting ? <PreLoader horizontal /> : <Divider />}
          <div className="card-content">
            <ConnectedResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

ResetPasswordPage.propTypes = {
  isRequesting: PropTypes.bool,
};

ResetPasswordPage.defaultProps = {
  isRequesting: false,
};

const mapStateToProps = ({ resetPassword }) => resetPassword;

export default connect(mapStateToProps, null)(ResetPasswordPage);
