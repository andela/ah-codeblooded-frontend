import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './LikeDislike.scss';

import { likeArticle, dislikeArticle, fetchReactions } from './state/actions';

class LikeDislike extends Component {
  componentWillMount = () => {
    const { slug, fetch } = this.props;
    fetch(slug);

    this.interval = setInterval(() => {
      fetch(slug);
    }, 30000);
  };

  handleLike = () => {
    const { slug, likes, like } = this.props;
    like(slug, likes.me);
  };

  handleDislike = () => {
    const { slug, dislikes, dislike } = this.props;
    dislike(slug, dislikes.me);
  };

  render() {
    const {
      likes, dislikes,
    } = this.props;
    return (
        <>
          <span>{ likes.count }</span>
          <button
            type="button"
            active
            onClick={this.handleLike}
            className="valign-wrapper waves-effect btn btn-flat white"
          >
            <i className={`material-icons reaction ${likes.me ? 'active' : ''}`}>thumb_up</i>
          </button>
          <span>{ dislikes.count }</span>
          <button
            type="button"
            onClick={this.handleDislike}
            className="valign-wrapper waves-effect btn btn-flat white"
          >
            <i className={`material-icons reaction ${dislikes.me ? 'active' : ''}`}>thumb_down</i>
          </button>
        </>
    );
  }
}

LikeDislike.propTypes = {
  likes: PropTypes.shape({
    count: PropTypes.number,
    me: PropTypes.bool,
  }).isRequired,
  dislikes: PropTypes.shape({
    count: PropTypes.number,
    me: PropTypes.bool,
  }).isRequired,
  // isFetching: ArticlePropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ likeDislike }) => likeDislike;

export default connect(
  mapStateToProps,
  { like: likeArticle, dislike: dislikeArticle, fetch: fetchReactions },
)(LikeDislike);
