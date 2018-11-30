import React from 'react';
import profileImage from '../../assets/images/profile.jpg';
import './ProfileView.scss';
import ConnnectedFollowUnfollow from "../../containers/FollowUnfollow";
import { getCurrentUser } from "../../utils/auth";

const ProfileView = ({ profile }) => (
  <>
    <div className="profile-view">
      <div className="row">
        <div className="card">
          <div className="card-image">
            <img src={profile.image || profileImage} alt="" />
            <span className="card-title"><a className="green-text" href={profile && `/profiles/view/${profile.username}`}>{ profile.username }</a></span>
          </div>
          <div className="card-content">
            <div className="followButton">
              <ConnnectedFollowUnfollow username={profile.username} user={getCurrentUser()} />
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
    </>
);

ProfileView.defaultProps = {
  profile: {},
  following: false,
  handleFollow: null,
};

export default ProfileView;
