import React, { Component } from 'react';
import { connect } from 'react-redux';
import Materialize from 'materialize-css';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import avatar2 from '../../../assets/images/avatar2.png';
import { getUserProfileAction } from '../state/actions';
import EditProfiles from '../EditProfiles';
import './ViewProfiles.scss';
import NavBar from '../../NavBar';

class ViewProfiles extends Component {
  modal = React.createRef();

  componentDidMount = () => {
    const { history, user } = this.props;
    const modals = document.querySelector('.modal');
    Materialize.Modal.init(modals, {});
    const { getUserProfile } = this.props;
    getUserProfile(user.username);
    history.push(`/profiles/view/${user.username}`);
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
        <NavBar {...this.props} />
        <EditProfiles {...this.props} />
        <div className="container">
          <div className="card" styles="margin-top:40px">
            <div className="card-content">
              <a className="small modal-trigger right" href="#edit-profile-modal"><i className="material-icons">create</i></a>
              <div className="row">
                <div className="col"><span className="flow-text"><img src={profile.image || avatar2} className="responsive-img circle profile" alt="profile" /></span></div>
                <div className="col s8">
                  <span className="flow-text">
                    <h5 styles="font-weight: bolder">{profile && profile.username}</h5>
                  </span>
                  <p>{ profile && profile.bio }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getUserProfile: getUserProfileAction,
  },
  dispatch,
);

const mapStateToProps = state => ({
  profile: state.userProfiles.profile,
  isPageLoading: state.pageProgress.isPageLoading,
});

ViewProfiles.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  getUserProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfiles);