import React, { Component } from 'react';
import Button from '../../components/Button';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
        <div>
          <h1>Authors Haven</h1>
          <Button/>
      </div>
    );
  }
}

export default connect()(App);
