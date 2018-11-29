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
    Materialize.Modal.init(this.getModal(), { dismissible: false });
  }

  componentDidUpdate() {
    const { networkError } = this.props;
    const instance = Materialize.Modal.getInstance(this.getModal());
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
