import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './LikeDislike.scss';

import { likeArticle, dislikeArticle, fetchReactions } from './state/Actions';

class LikeDislike extends Component {
    componentWillMount = () => {
      const { slug, fetch } = this.props;
      fetch(slug);

      this.interval = setInterval(() => {
        fetch(slug);
      }, 3000);
    }

    handleLike = () => {
      const { slug, likes, like } = this.props;
      like(slug, likes.me);
    }

    handleDislike = () => {
      const { slug, dislikes, dislike } = this.props;
      dislike(slug, dislikes.me);
    }

    render() {
      const {
        likes, dislikes,
      } = this.props;
      return (
        <div className="col l8 s12 row valign-wrapper">
          <span>{ likes.count }</span>
          <button
            type="button"
            active
            onClick={this.handleLike}
            className="valign-wrapper waves-effect waves-light btn btn-flat white"
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
        </div>
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
  // isFetching: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ likeDislike }) => likeDislike;

export default connect(
  mapStateToProps, { like: likeArticle, dislike: dislikeArticle, fetch: fetchReactions },
)(LikeDislike);
