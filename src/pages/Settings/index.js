import React from 'react';
import ConnectedSubscribe from '../../containers/Subscribe/index';

const SettingsPage = () => (
  <>
    <nav className="white black-text">
      <div className="container">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo center black-text logo">
            {"Author's Haven"}
          </a>
        </div>
      </div>
    </nav>
    <div className="container">
      <h1>Settings</h1>
      <hr />
      <ConnectedSubscribe />
    </div>
  </>
);

export default SettingsPage;
