import React from 'react';
import PropTypes from 'prop-types';

const PreLoader = ({
  horizontal, progress, determinate, size, classNames,
}) => (
  (
    horizontal ? (
      <div className={`progress ${classNames}`}>
        <div className={determinate ? 'determinate' : 'indeterminate'} style={{ width: `${progress}%` }} />
      </div>
    ) : (
      <div className={`preloader-wrapper ${size} ${classNames} active`}>
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
  classNames: '',
};

PreLoader.propTypes = {
  horizontal: PropTypes.bool,
  progress: PropTypes.number,
  classNames: PropTypes.string,
  determinate: PropTypes.bool,
  size: PropTypes.string,
};

export default PreLoader;
