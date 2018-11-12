import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { likeArticle, dislikeArticle, fetchReactions } from './state/Actions';

// eslint-disable-next-line react/prefer-stateless-function
class LikeDislike extends Component {
    componentWillMount = () => {
      const { slug } = this.props;
      this.props.fetchReactions(slug);

      this.interval = setInterval(() => {
        this.props.fetchReactions(slug);
      }, 300000);
    }

    handleLike = () => {
      const { slug, likes } = this.props;
      this.props.likeArticle(slug, likes.me);
    }

    handleDislike = () => {
      const { slug, dislikes } = this.props;
      this.props.dislikeArticle(slug, dislikes.me);
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
            onClick={this.handleLike}
            className={`valign-wrapper waves-effect waves-light ${likes.me ? 'teal-text' : ''} btn btn-flat white`}
          >
            <i className="material-icons">thumb_up</i>
          </button>
          <span>{ dislikes.count }</span>
          <button
            type="button"
            onClick={this.handleDislike}
            className={`valign-wrapper waves-effect ${dislikes.me ? 'teal-text' : ''} btn btn-flat white`}
          >
            <i className="material-icons">thumb_down</i>
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
  isFetching: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  likeArticle: PropTypes.func.isRequired,
  dislikeArticle: PropTypes.func.isRequired,
  fetchReactions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ likeDislike }) => likeDislike;

export default connect(
  mapStateToProps, { likeArticle, dislikeArticle, fetchReactions },
)(LikeDislike);
