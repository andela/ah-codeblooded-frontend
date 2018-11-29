import React, { Component } from "react";
import { connect } from "react-redux";
import Materialize from "materialize-css";
import PropTypes from "prop-types";
import { reloadLocation } from "../../utils/helpers";
import './NetworkPopup.scss';

const MODAL = "network_error_modal";

export class NetWorkPopup extends Component {
  onClick = () => {
    reloadLocation();
  };

  getModal = () => document.querySelector(`.${MODAL}`);

  componentDidMount() {
    const instance = Materialize.Modal.init(this.getModal(), { dismissible: false });
    this.setState({ instance });
  }

  componentDidUpdate() {
    const { networkError } = this.props;
    const { instance } = this.state;
    if (networkError) {
      instance.open();
    } else {
      instance.close();
    }
  }

  render() {
    return (
      <div className={`modal ${MODAL}`}>
        <div className="modal-content">
          <div className="valign-wrapper">
              You are currently offline.&nbsp;&nbsp;
            <button className="btn" type="button" onClick={this.onClick}>Reconnect</button>
          </div>
        </div>
      </div>
    );
  }
}

NetWorkPopup.propTypes = {
  networkError: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ network }) => network;

export default connect(mapStateToProps, null)(NetWorkPopup);
