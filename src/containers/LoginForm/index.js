import React, { Component } from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import PropTypes from "prop-types";
import { Button } from "react-materialize";
import ROUTES from "../../utils/routes";
import Input from "../../components/TextInput";
import loginAction from "./state/actions";

export class LoginForm extends Component {
  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    Materialize.updateTextFields();
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const data = { ...this.state };
    this.props.loginAction({ user: data }, () => {
      history.push("/");
    });
  };

  loginProgress = () => (
    <div className="progress">
      <div className="indeterminate" />
    </div>
  );

  render() {
    const { email, password } = this.state;
    const { isLogingIn, errors } = this.props;

    const inputs = [
      {
        label: 'Email',
        value: email,
        type: 'email',
        name: 'email',
        onChange: this.onChange,
      },
      {
        label: 'Password',
        value: password,
        type: 'password',
        name: 'password',
        onChange: this.onChange,
      },
    ];

    return (
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <div className="card white darken-1">
            <div>{isLogingIn ? this.loginProgress() : null}</div>
            <div className="card-content black-text">
              <span className="card-title">Login</span>
              {errors.length > 0 ? (
                <div className="red-text">
                  <p>Username and password do not match. Please try again</p>
                </div>
              ) : null}
              <form onSubmit={this.handleSubmit}>
                {inputs.map(input => (
                  <Input {...input} />
                ))}

                <div className="col m6">
                  <Button
                    className="btn waves-effect waves-light"
                    type="submit"
                  >
                    Login
                    <i className="material-icons right">send</i>
                  </Button>
                </div>
                <p>
                  <a href={ROUTES.forgotPassword}>Forgot your Password?</a>
                </p>
                <p>
                  Dont have an account?
                  <a href={ROUTES.register}> Create one</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.defaultProps = {
  isLogingIn: false,
  errors: {},
};

LoginForm.propTypes = {
  loginAction: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  isLogingIn: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ login }) => login;

export default connect(
  mapStateToProps,
  { loginAction },
)(LoginForm);
