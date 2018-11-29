import React, { Component } from 'react';
import { connect } from 'react-redux';
import Materialize from 'materialize-css';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import avatar2 from '../../../assets/images/avatar2.png';
import { editUserProfileAction } from '../state/actions';
import Modal from '../../../components/Modal';
import './EditProfiles.scss';


class EditProfiles extends Component {
  state = {
    bio: '',
    images: [],
    image: '',
  };

  componentDidMount = () => {
    const { history, user } = this.props;
    const modal = document.querySelector('#edit-profile-modal');
    Materialize.Modal.init(modal, {});
    history.push(`/profiles/edit/${user.username}`);
  };

  onChange = (e) => {
    const { name } = e.target;
    this.setState({ [name]: name === 'images' ? e.target.files : e.target.value });
    /* istanbul ignore next */
    if (name === 'images') {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        this.setState({ image: event.target.result });
      });

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  imageClicked = () => {
    document.getElementById('upload-image').click();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { bio, images } = this.state;
    const data = new FormData();
    data.append('bio', bio);
    if (images.length === 1) {
      data.append('image', images[0]);
    }
    const { editUserProfile, user } = this.props;
    editUserProfile(user.username, data);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ bio: nextProps.profile.bio, image: nextProps.profile.image });
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
        <Modal title={profile.username} id="edit-profile-modal">
          <div className="edit-profile-content">
            <div className="image">
              <img src={this.state.image || avatar2} className="responsive circle profile" onClick={this.imageClicked} styles="cursor: pointer" alt="profile" />
            </div>
            <div className="edit-profile">
              <form onSubmit={this.handleSubmit}>
                <textarea name="bio" onChange={this.onChange} maxLength="200" placeholder="Bio" id="bio" cols="100" rows="80" value={this.state.bio} />
                <input name="images" onChange={this.onChange} type="file" id="upload-image" style={{ visibility: 'hidden' }} />
                <div className="right">
                  <a href="#!" className="modal-close waves-effect white btn-flat">Cancel</a>
                  <button type="submit" className="modal-close waves-effect teal white-text btn-flat submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    editUserProfile: editUserProfileAction,
  },
  dispatch,
);

export const mapStateToProps = state => ({
  profile: state.userProfiles.profile,
});

EditProfiles.propTypes = {
  editUserProfile: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape().isRequired,
  profile: PropTypes.shape({
    image: PropTypes.shape([]).isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfiles);
