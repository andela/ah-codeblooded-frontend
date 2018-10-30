import React from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button';

const App = () => (
  <div>
    <h1>Authors Haven</h1>
    <Button />
  </div>
);

export default connect()(App);
