import React, { Component } from 'react';
import ROUTES from '../../utils/routes';
import SignForm from '../../containers/SignupForm';

class SignUpPage extends Component {
  render() {
    return (
      <>
        <nav className="white black-text">
          <div className="container">
            <div className="nav-wrapper">
              <a href={ROUTES.index} className="brand-logo center black-text logo">{'Author\'s Haven'}</a>
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col s4 offset-12">
            <SignForm />
          </div>
        </div>
      </>
    );
  }
}

export default SignUpPage;
