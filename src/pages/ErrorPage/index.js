import React from 'react';
import './ErrorPage.scss';
import PropTypes from 'prop-types';

export const ErrorPage = ({ errorCode, errorMessage }) => (
  <div>
    <div className="background" />
    <div className="error-code center-align">{errorCode}</div>
    <div className="row">
      <div className="col m4 offset-m4">
        <div className="card">
          <div className="card-title center-align">
            <h4>
              Oops something went wrong!!
            </h4>
          </div>
          <div className="card-content center">
            <div className="error-message">{errorMessage}</div>
          </div>
          <div className="card-action center">
            <a href="/" className="btn-bordered">Take me home</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ErrorPage.propTypes = {
  errorCode: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
