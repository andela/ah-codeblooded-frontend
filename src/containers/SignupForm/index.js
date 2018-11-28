import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import PropTypes from 'prop-types';
import * as Materialize from 'materialize-css';
import { bindActionCreators } from 'redux';
import ROUTES from '../../utils/routes';
import Input from '../../components/TextInput/index';
import register from './state/actions';
import PreLoader from '../../components/PreLoader';

export class SignForm extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    errors: {},
    messageShown: false,
  };

  componentDidMount() {
    Materialize.updateTextFields();
  }

  componentWillReceiveProps = (nextProps) => {
    const { errors } = nextProps;
    this.setState({ errors });
  }

  componentDidUpdate = (prevProps) => {
    const { success } = this.props;
    if (!prevProps.success && success) {
      setTimeout(this.clearState, 1000);
      setTimeout(() => this.setState({ messageShown: true }), 0);
    }

    if (prevProps.success && success) {
      setTimeout(() => this.setState({ messageShown: false }), 4000);
    }
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

 registrationSuccessful = () => (
   <div className="green-text center-align">
     <p>Registration successful!</p>
     <p>Check your email for the activation link.</p>
   </div>
 );

 clearState = () => {
   this.setState({
     username: '',
     password: '',
     confirmPassword: '',
     email: '',
     errors: {},
   });
 };


 render() {
   const {
     username, password, email, confirmPassword, errors, messageShown,
   } = this.state;
   const { isRegistering } = this.props;
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
     <div className="card white darken-1 login-form" id="myDiv">
       <div className="card-content black-text">
         { messageShown && this.registrationSuccessful()}
         <span className="card-title center-align">Registration</span>
         { isRegistering && <PreLoader horizontal /> }
         <form onSubmit={this.handleSubmit}>
           { inputs.map(input => (
             <Input {...input} />
           ))}
           <div className="row center">
             <Button
               className="btn waves-effect waves-light"
               type="submit"
               disabled={isRegistering}
             >
               Sign up
               <i className="material-icons right">send</i>
             </Button>
           </div>
           <div className="row">
             <a href={ROUTES.auth.login}>
               Already have an account?
             </a>
           </div>
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
