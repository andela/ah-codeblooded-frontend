import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { followAction, unfollowAction, fetchAction } from "../FollowUnfollow/state/actions";

export class FollowButton extends React.Component {
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

  render() {
    return (
      <div>
        {this.props.following ? (
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
FollowButton.propTypes = {
  fetch: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  username: PropTypes.shape({}).isRequired,
  following: PropTypes.bool.isRequired,
};
const mapStateToProps = ({ follow }) => follow;

export default connect(
  mapStateToProps,
  { follow: followAction, unfollow: unfollowAction, fetch: fetchAction },
)(FollowButton);
