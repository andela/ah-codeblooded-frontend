import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "../LikeDislike/LikeDislike.scss";
import {
  likeCommentAction,
  dislikeCommentAction,
  fetchCommentStat,
} from './state/actions';
import { reactionsInitialState } from './state/reducer';

export class LikeDislikeComments extends Component {
  componentWillMount = () => {
    const { fetchComment, slug, id } = this.props;
    fetchComment(slug, id);
  }

 refresh = () => setTimeout(() => {
   /* istanbul ignore next */
   const { fetchComment, slug, id } = this.props;
   fetchComment(slug, id);
 }, 1000);

  handleLike = () => {
    const { likeComment, slug, id } = this.props;
    likeComment(slug, id);
    this.refresh();
  };

  handleDislike = () => {
    const { dislikeComment, slug, id } = this.props;
    dislikeComment(slug, id);
    this.refresh();
  };

  render() {
    const { id } = this.props;
    const reactions = reactionsInitialState;
    if (this.props.reactions) {
      if (this.props.reactions[id]) {
        /* istanbul ignore next */
        Object.assign(reactions, this.props.reactions[id]);
      }
    }
    const { likes, dislikes } = reactions;
    return (
      <div className="valign-wrapper">
        <span>{likes && likes.count}</span>
        <button
          id="like_comment"
          type="button"
          active
          onClick={this.handleLike}
          className="valign-wrapper waves-effect btn btn-flat white"
        >
          <i className={`material-icons reaction ${likes && likes.me && 'active'}`}>thumb_up</i>
        </button>

        <span>{likes && dislikes.count}</span>
        <button
          id="dislike_comment"
          type="button"
          onClick={this.handleDislike}
          className="valign-wrapper waves-effect btn btn-flat white"
        >
          <i className={`material-icons reaction ${dislikes && dislikes.me && 'active'}`}>thumb_down</i>
        </button>
      </div>
    );
  }
}

LikeDislikeComments.propTypes = {
  fetchComment: PropTypes.func.isRequired,
  likeComment: PropTypes.func.isRequired,
  dislikeComment: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  reactions: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ likeDislikeComment }) => likeDislikeComment;
export default connect(mapStateToProps, {
  likeComment: likeCommentAction,
  dislikeComment: dislikeCommentAction,
  fetchComment: fetchCommentStat,
})(LikeDislikeComments);
