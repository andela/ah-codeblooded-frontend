import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { randomKey } from "../../utils/helpers";
import { fetchStatsAction, refreshStatsAction } from "./state/actions";
import { getCurrentUser } from "../../utils/auth";
import Empty from "../../components/Empty";

export class Stats extends Component {
  fetch = () => {
    const { fetchStats } = this.props;
    fetchStats();
  };

  refresh = () => {
    const { refreshStats } = this.props;
    refreshStats();
  };

  componentDidMount() {
    this.fetch();
  }

  renderFetching = () => <Empty message="Loading your stats ... Please wait." />;

  renderNoStats = () => {
    const { error } = this.props;
    return (
      <h6>
        {error || "You have no articles at the moment. Write articles to gain reputation on Authors Haven."}
      </h6>
    );
  };

  renderStatsTable = stats => (
    <table className="striped">
      <thead>
        <tr>
          <th>Article</th>
          <th>Views</th>
          <th>Rating</th>
          <th>Likes</th>
          <th>Dislikes</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {stats.map(stat => (
          <tr key={randomKey()}>
            <th><p><a href={`/article/@${getCurrentUser().username}/${stat.slug}`}>{stat.title}</a></p></th>
            <td>{stat.view_count}</td>
            <td>{stat.average_rating}</td>
            <td>{stat.like_count}</td>
            <td>{stat.dislike_count}</td>
            <td>{stat.comment_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  onRefresh = () => {
    this.refresh();
  };

  renderStats = stats => (
    <div>
      <div className="row valign-wrapper">
        <i className="large material-icons">insert_chart</i>
        <div className="col s10 left-align">
          <h4>Stats</h4>
        </div>
        <button type="button" className="waves-effect waves-light btn" onClick={this.onRefresh}>
         Refresh
        </button>
      </div>
      <div className="card">
        <div className="card-content">
          {stats.length ? this.renderStatsTable(stats) : this.renderNoStats()}
        </div>
      </div>
    </div>
  );

  render() {
    const { stats, isFetching } = this.props;
    return isFetching ? this.renderFetching() : this.renderStats(stats);
  }
}

Stats.propTypes = {
  error: PropTypes.string,
  stats: PropTypes.instanceOf(Array).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchStats: PropTypes.func.isRequired,
  refreshStats: PropTypes.func.isRequired,
};

Stats.defaultProps = {
  error: null,
};

const mapStateToProps = ({ stats }) => stats;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchStats: fetchStatsAction,
  refreshStats: refreshStatsAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
