import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProfileView from "../../components/ProfileView";
import Empty from "../../components/Empty";
import { fetchUsersAction } from "./state/actions";
import { getCurrentUser } from "../../utils/auth";
import PreLoader from "../../components/PreLoader";


class UsersListing extends React.Component {
  componentDidMount = () => {
    const user = getCurrentUser();

    const { fetchUsers, listName } = this.props;
    fetchUsers(user.username, listName);
  };

  getEmptyMessage = () => (this.props.listName === "following"
    ? "You are not following any authors at the moment"
    : "You do not have any followers at the moment")

  renderList = users => (
    <div className="row">
      {
        users.length === 0 ? <Empty message={this.getEmptyMessage()} icon="account_circle" /> : (
          users.map(user => (
            <div className="col s3">
              <ProfileView profile={user} following={this.props.listName === "following"} />
            </div>
          ))
        )
      }
    </div>
  );

  render() {
    const { users, isFetching } = this.props;
    return isFetching || !users
      ? <PreLoader /> : this.renderList(users);
  }
}

UsersListing.propTypes = {
  listName: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  users: PropTypes.shape().isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

const mapStateToProps = ({ usersListing }, ownProps) => (
  ownProps.listName ? usersListing[ownProps.listName] : usersListing
);

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUsers: fetchUsersAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersListing);
