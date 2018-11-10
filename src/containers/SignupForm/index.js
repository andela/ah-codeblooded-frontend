import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import PropTypes from 'prop-types';
import * as Materialize from 'materialize-css';
import { bindActionCreators } from 'redux';
import Input from '../../components/TextInput/index';
import register from './state/actions';

export class SignForm extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    errors: {},
  };

  componentDidMount() {
    Materialize.updateTextFields();
  }

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
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ errors: {} });
    if (this.validate()) {
      const data = {
        ...this.state,
      };
      const { registerUser } = this.props;
      registerUser({ user: data });
    }
  };

  showProgress = () => (
    <div className="progress">
      <div className="indeterminate" />
    </div>
  );

 registrationSuccessful = () => (
   <div className="green-text center-align">
     <p>Registration successful!</p>
     <p>Check your email for the activation link.</p>
   </div>
 );


 render() {
   const { username, password, email, confirmPassword, errors } = this.state;
   const { isRegistering, success } = this.props;
   const inputs = [
     {
       label: 'Username',
       value: username,
       name: 'username',
       type: 'text',
       errors: errors.username,
       onChange: this.onChange,
     },
     {
       label: 'Email',
       value: email,
       name: 'email',
       type: 'email',
       errors: errors.email,
       onChange: this.onChange,
     },
     {
       label: 'Password',
       value: password,
       name: 'password',
       type: 'password',
       errors: errors.password,
       onChange: this.onChange,
     },
     {
       label: 'Confirm Password',
       value: confirmPassword,
       name: 'confirmPassword',
       type: 'password',
       errors: errors.password,
       onChange: this.onChange,
     },
   ];


   return (
     <div className="card white darken-1" id="myDiv">
       { isRegistering && this.showProgress() }
       <div className="card-content black-text">
         { success && this.registrationSuccessful() }
         <span className="card-title center-align">Registration</span>
         <form onSubmit={this.handleSubmit}>
           { inputs.map(input => (
             <Input {...input} />
           ))}
           <Button
             className="btn waves-effect waves-light"
             type="submit"
             disabled={isRegistering}
           >
                Sign up
             <i className="material-icons right">send</i>
           </Button>
         </form>
       </div>
     </div>

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
    user: PropTypes.object,
  }),
  registerUser: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  isRegistering: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ signUp }) => signUp;

const mapDispatchToProps = dispatch => bindActionCreators({
  registerUser: register,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignForm);
