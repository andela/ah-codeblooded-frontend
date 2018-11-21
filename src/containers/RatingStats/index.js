import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { fetchRatingsAction } from './state/actions';

export class RatingStats extends PureComponent {
  componentDidMount = () => {
    const { fetchRatings, slug } = this.props;
    fetchRatings(slug);
  };

  barWidth = (ratings, totalUsers) => `${(ratings / totalUsers) * 20}%`;

  barGraph = (star, pos, ratings, totalUsers) => (
    <div className="rating-histogram col s12">
      <div className={`rating-bar-container ${pos}`}>
        <span className="bar-label">
          <span className="star-tiny" />
          {star}
        </span>
        <span className="bar" style={{ width: this.barWidth(ratings, totalUsers) }} />
        <span className="bar-number">{ratings}</span>
      </div>
    </div>
  );

  render() {
    const { rating } = this.props;
    return (
      <div className="row">
        <div className="reviews-stats col s1">
          <div className="score">{rating.avg_rating.toFixed(1)}</div>
          <span className="reviews-num grey-text meta">{`${rating.total_user} total`}</span>
        </div>
        <div className="col s11 bar-graph">
          {this.barGraph(5, 'five', rating.each_rating['5'], rating.total_user)}
          {this.barGraph(4, 'four', rating.each_rating['4'], rating.total_user)}
          {this.barGraph(3, 'three', rating.each_rating['3'], rating.total_user)}
          {this.barGraph(2, 'two', rating.each_rating['2'], rating.total_user)}
          {this.barGraph(1, 'one', rating.each_rating['1'], rating.total_user)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ratingStats }) => ratingStats;
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchRatings: fetchRatingsAction,
  },
  dispatch,
);

RatingStats.propTypes = {
  fetchRatings: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  rating: PropTypes.shape().isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingStats);
