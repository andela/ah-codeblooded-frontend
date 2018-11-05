import React from 'react';

const ProgressButton = ({loading, children}) => (
  <>
    {
      loading ? (
        <div>
          loader
        </div>
      )
        : (
          <button type="button" className="btn">
            {children}
          </button>
        )
    }
  </>
);

ProgressButton.defaultProps = {
  loading: false,
};


export default ProgressButton;
