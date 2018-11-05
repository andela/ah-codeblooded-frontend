import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import PropTypes from 'prop-types';
import * as M from 'materialize-css';
import { bindActionCreators } from 'redux';
import { renderInputField } from '../../components/TextInput/index';
import registerUserAction from './state/actions';

class SignForm extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    errors: {},
  };

  componentDidMount() {
    M.updateTextFields();
  }

  renderInput = (value, label, errors, name, type = 'text') => (
    renderInputField(this.onChange, value, label, errors, name, type)
  )

  componentWillReceiveProps = (nextProps) => {
    const { errors } = nextProps;
    this.setState({ errors });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validate = () => {
    const {
      password, confirmPassword,
    } = this.state;
    if (password !== confirmPassword) {
      const { errors } = this.state;
      errors.password = ['Passwords do not match'];
      this.setState({ errors });
      return false;
    }

    this.setState({ errors: {} });
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      const data = {
        ...this.state,
      };
      const { registerUser } = this.props;
      registerUser({ user: data });
    }
  };

  render() {
    const {
      username, password, email, confirmPassword,
    } = this.state;
    const { errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput(username, 'Username', errors.username, 'username')}
        {this.renderInput(email, 'Email', errors.email, 'email', 'email')}
        {this.renderInput(password, 'Password', errors.password, 'password', 'password')}
        {this.renderInput(confirmPassword, 'Confirm Password', errors.password, 'confirmPassword', 'password')}
        <Button type="submit">Sign up</Button>
      </form>
    );
  }
}

SignForm.defaultProps = {
  errors: {
    username: [],
    email: [],
    password: [],
  },
};

SignForm.propTypes = {
  errors: PropTypes.shape({
    username: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
  }),
};

const mapStateToProps = ({ signUp }) => signUp;

const mapDispatchToProps = dispatch => bindActionCreators({
  registerUser: registerUserAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignForm);
