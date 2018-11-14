import React from 'react';
import PropTypes from 'prop-types';
import './Empty.scss';

const Empty = ({ message, icon }) => (
  <div className="card empty">
    <div className="card-content">
      <div className="row">
        <div className="center col s12 m6 offset-m3">
          <i className="material-icons icon grey-text">{ icon }</i>
          <div className="message">
            { message }
          </div>
        </div>
      </div>
    </div>
  </div>
);

Empty.defaultProps = {
  icon: 'hourglass_empty',
  message: 'No Items',
};

Empty.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.string,
};

export default Empty;
