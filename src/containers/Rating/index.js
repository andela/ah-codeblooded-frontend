import * as Materialize from 'materialize-css';
import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { rateArticle, currentRate } from './state/action';
import './rating.scss';

class Rating extends Component {
  componentDidMount = () => {
    this.props.currentRate();
  };

  rate = this.props;

  onStarClick = (nextValue) => {
    this.props.rateArticle(nextValue);
    this.setState({ rate: nextValue });
  };

  toaster = () => {
    Materialize.toast({ html: this.rate.state });
  };

  render() {
    const { rate } = this.props;
    const toaster = () => {
      Materialize.toast({ html: rate.state });
    };

    return (
      <div className="col row l4 s12 valign-wrapper star" style={{ color: 'yellow' }}>
        {rate.state === 'You cannot rate your own article.' ? toaster() : ''}
        <StarRatingComponent
          name="rateArticle"
          starCount={5}
          value={rate.state}
          className="col row 8 s12 valign-wrapper"
          onStarClick={this.onStarClick}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ rate }) => ({
  rate,
});

Rating.propTypes = {
  rateArticle: PropTypes.func.isRequired,
  currentRate: PropTypes.func.isRequired,
  rate: PropTypes.shape().isRequired,
};
export default connect(
  mapStateToProps,
  { rateArticle, currentRate },
)(Rating);
