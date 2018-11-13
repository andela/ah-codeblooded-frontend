import React from 'react';
import PropTypes from 'prop-types';

const PreLoader = ({
  horizontal, progress, determinate, size,
}) => (
  (
    horizontal ? (
      <div className="progress">
        <div className={determinate ? 'determinate' : 'indeterminate'} style={{ width: `${progress}%` }} />
      </div>
    ) : (
      <div className={`preloader-wrapper ${size} active`}>
        <div className="spinner-layer">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    )
  )
);

PreLoader.defaultProps = {
  horizontal: false,
  progress: 0,
  determinate: false,
  size: 'small',
};

PreLoader.propTypes = {
  horizontal: PropTypes.bool,
  progress: PropTypes.number,
  determinate: PropTypes.bool,
  size: PropTypes.string,
};

export default PreLoader;
