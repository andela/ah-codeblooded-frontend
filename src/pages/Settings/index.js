import React from 'react';
import ConnectedSubscribe from '../../containers/Subscribe/index';
import NavBar from '../../containers/NavBar';

const SettingsPage = () => (
  <>
    <NavBar />
    <div className="container">
      <h1>Settings</h1>
      <hr />
      <ConnectedSubscribe />
    </div>
  </>
);

export default SettingsPage;
