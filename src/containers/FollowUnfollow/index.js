import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followAction, unfollowAction, fetchAction } from "./state/actions";

export class FollowUnfollow extends React.Component {
  componentDidMount = () => {
    const { fetch, username } = this.props;
    fetch(username);
  };

  handleFollow = () => {
    const { follow, username } = this.props;
    follow(username);
  };

  handleUnfollow = () => {
    const { unfollow, username } = this.props;
    unfollow(username);
  };

  isFollowing = () => {
    const { username } = this.props;
    let following = false;
    if (this.props && this.props.users) {
      const { users } = this.props.users.following;
      users.forEach((user) => {
        if (user.username === username) {
          following = true;
        }
      });
    }
    return following;
  };

  render() {
    return (
      <div>
        {this.isFollowing() ? (
          <button className="btn small waves-effect red" type="button" onClick={this.handleUnfollow}>
        Unfollow
          </button>
        ) : (
          <button className="btn small waves-effect green" type="button" onClick={this.handleFollow}>
        Follow
          </button>
        )}
      </div>
    );
  }
}

FollowUnfollow.propTypes = {
  fetch: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  users: PropTypes.shape({
    following: PropTypes.shape({
      users: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  follow: state.follow,
  users: state.usersListing,
});

export default connect(
  mapStateToProps,
  { follow: followAction, unfollow: unfollowAction, fetch: fetchAction },
)(FollowUnfollow);
