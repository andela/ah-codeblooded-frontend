import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "../../containers/NavBar";
import ConnectedStats from "../../containers/Stats";
import "./StatsPage.scss";

export const StatsPage = ({ isRefreshing }) => (
  <div>
    <NavBar isPageLoading={isRefreshing} />
    <div className="container stats-container">
      <ConnectedStats />
    </div>
  </div>
);

StatsPage.propTypes = {
  isRefreshing: PropTypes.bool,
};

StatsPage.defaultProps = {
  isRefreshing: false,
};

const mapStateToProps = ({ stats }) => stats;

export default connect(mapStateToProps, null)(StatsPage);
