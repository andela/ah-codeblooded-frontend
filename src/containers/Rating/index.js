import * as Materialize from 'materialize-css';
import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { rateArticle, currentRate } from './state/action';
import './rating.scss';

export class Rating extends Component {
  componentDidMount = () => {
    const { slug } = this.props;
    this.props.currentRate(slug);
  };

  onStarClick = (nextValue) => {
    const { slug } = this.props;
    this.props.rateArticle(nextValue, slug);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.rate.state === 'You cannot rate your own article.') {
      Materialize.toast({ html: nextProps.rate.state });
    }
  };

  render() {
    const { rate } = this.props;
    return (
      <StarRatingComponent
        name="rateArticle"
        starCount={5}
        value={rate.state}
        className="col row 8 s12 valign-wrapper star"
        onStarClick={this.onStarClick}
      />
    );
  }
}

const mapStateToProps = ({ rate }) => ({
  rate,
});

Rating.propTypes = {
  rateArticle: PropTypes.func.isRequired,
  currentRate: PropTypes.func.isRequired,
  rate: PropTypes.shape({
    state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  slug: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  { rateArticle, currentRate },
)(Rating);
