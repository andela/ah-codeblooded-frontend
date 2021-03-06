import React, { Component } from 'react';
import ROUTES from '../../utils/routes';
import Form from '../../containers/SignupForm';


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
          <div className="col m4 offset-m4" style={{ paddingTop: '30px' }}>
            <Form />
          </div>
        </div>
      </>
    );
  }
}

export default SignUpPage;
