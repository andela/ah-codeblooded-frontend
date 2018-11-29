import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from "react-moment";
import MenuItem from "../NavBar/MenuItem";
import DropDown from "../../components/DropDown";
import DropDownItem from "../../components/DropDownItem";
import { fetchNotificationsAction } from "./state/actions";
import './Notifications.scss';
import { getCurrentUser } from "../../utils/auth";

const user = getCurrentUser();


export const getNotificationsDropdown = notes => (
  <DropDown
    id="notifications-dropdown"
    list={
      notes.map(note => (
        <DropDownItem>
          <div className="notification valign-wrapper">
            <div>
              <i>
                <img src={user.image} className="icon-image circle" alt="Avatar" />
              </i>
            </div>
            <a href="">
              <p className="description">{note.description}</p>
              <span className="grey-text meta">
                <Moment fromNow interval={30000}>
                  {note.timestamp}
                </Moment>
              </span>
            </a>
          </div>
          <div className="horizontal divider grey lighten-2" />
        </DropDownItem>
      ))
    }
  />
);
class Notifications extends React.Component {
  componentWillMount = () => {
    const { getNotifications } = this.props;
    getNotifications();

    this.interval = setInterval(() => {
      getNotifications();
    }, 30000);
  };

  render() {
    const { notifications } = this.props;
    const { count } = notifications;
    let myList = notifications.notificationList.notifications;
    myList = myList || [];

    return (
      <MenuItem
        link=""
        icon="notifications"
        dropDown={getNotificationsDropdown(myList)}
        badge={count}
      />
    );
  }
}

const mapStateToProps = ({ notifications }) => notifications;

const matchDispatchToProps = dispatch => bindActionCreators(
  {
    getNotifications: fetchNotificationsAction,
  },
  dispatch,
);

Notifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.shape({}).isRequired,
};

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(Notifications);
