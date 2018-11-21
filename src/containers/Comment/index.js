import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import profile from '../../assets/images/profile.jpg';
import './Comment.scss';
import Divider from '../../components/Divider';
import ConnectedCommentThread from '../CommentThread';
import { getCurrentUser } from '../../utils/auth';
import { deleteCommentAction } from '../CommentThread/state/actions';
import PreLoader from '../../components/PreLoader';
import ConnectedCommentEditor from '../CommentEditor';
import ConnectedLikeDislikeComments from '../LikeDislikeComment';

export class Comment extends Component {
  state = {
    commenting: false,
    editing: false,
    toDelete: false,
    deleting: false,
    author: "",
  };

  renderContextMenu = (comment, user) => (
    user && user.username === comment.author.username ? (
      <div className="right context-menu">
        {
          this.state.deleting ? <PreLoader />
            : (
             <>
               <button
                 className="btn btn-flat white"
                 type="button"
                 onClick={this.startEditing}
               >
                 <i className="material-icons">create</i>
               </button>
               <button
                 className="btn btn-flat white"
                 type="button"
                 onClick={this.startDeleting}
               >
                 <i className="material-icons">delete</i>
               </button>
             </>
            )
        }
      </div>
    ) : ""
  );

  renderDeleteContextMenu = (comment, user) => (
    user && user.username === comment.author.username ? (
      <div className="right context-menu center">
        <span>
          Are you sure you want to delete?
        </span>
        <div>
          <button
            className="btn btn-flat red white-text"
            type="button"
            onClick={this.deleteComment}
          >
            Yes
          </button>
          <button
            className="btn btn-flat white"
            type="button"
            onClick={this.stopDeleting}
          >
            No
          </button>
        </div>
      </div>
    ) : ""
  );

  deleteComment = () => {
    const { comment, deleteComment, slug } = this.props;
    this.setState({ deleting: true, toDelete: false });
    deleteComment(slug, comment.parent, comment.id, () => {
      /* istanbul ignore next */
      this.setState({ deleting: false });
    });
  };

  stopDeleting = () => {
    this.setState({ toDelete: false });
  };

  startDeleting = () => {
    this.setState({ toDelete: true });
  };

  startEditing = () => {
    this.setState({ editing: true });
  };

  cancelEdit = () => {
    this.setState({ editing: false });
  };

  renderComment = (comment, user) => (
    <div className="comment-content">
      { this.state.toDelete ? this.renderDeleteContextMenu(comment, user)
        : this.renderContextMenu(comment, user)}
      <div className="info-segment">
        <a href={`/profile/view/${comment.author.username}`}>
          <div className="author">
            <img
              src={comment.author.image || profile}
              alt=""
              className="profile circle img"
            />
            <div className="info">
              <div className="username">{comment.author && comment.author.username}</div>
              <div className="date meta">
                <Moment fromNow interval={30000}>
                  {comment.created_at}
                </Moment>
              </div>
            </div>
          </div>
        </a>
        <div>
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: this.generateBody(comment.body) }}
          />
        </div>
        <div className="row valign-wrapper">
          {
            user && (
              <div className="col">
                <span
                  className="reply valign-wrapper"
                  onClick={() => {
                    if (comment.parent) {
                      this.props.toggleComment(comment.author.username);
                    } else {
                      this.toggleComment(comment.author.username);
                    }
                  }}
                >
                  <i className="material-icons">reply</i>
                  Reply
                </span>
              </div>
            )
          }
          <div className="col like valign-wrapper">
            <ConnectedLikeDislikeComments id={comment.id} {...this.props} />
          </div>
        </div>
      </div>
    </div>
  );


  toggleComment = (username) => {
    const { commenting } = this.state;
    if (!commenting) {
      this.setState({ author: `@[${username}](${username}) ` });
    }
    this.setState({ commenting: !commenting });
  };


  generateBody = (body) => {
    const regExp = /@\[([A-Za-z0-9]+)]/;
    const username = body.match(regExp);

    const fullMarkup = /@\[([A-Za-z0-9]+)]\(([A-Za-z0-9]+)\)/;
    return username ? body.replace(fullMarkup,
      `<a href=${`/profiles/view/${username[1]}`}  
        class="comment-mention">${username[1]} </a>`) : body;
  };

  render() {
    const { comment } = this.props;
    const { commenting, editing } = this.state;
    const user = getCurrentUser() || this.props.user;
    return (
      <>
        <div className="comment">
          <div className="row">
            <div className="col s12">
              {editing
                ? (
                  <ConnectedCommentEditor
                    initialValue={comment.body}
                    update
                    {...this.props}
                    commentId={comment.id}
                    updateListener={this.cancelEdit}
                    cancelListener={this.cancelEdit}
                  />
                )
                : this.renderComment(comment, user)}
            </div>
            <div className={`col ${!comment.parent ? 's11 offset-s1' : 's12'}`}>
              {
                !comment.parent && (
                  <ConnectedCommentThread
                    {...this.props}
                    parentId={comment.id}
                    startCommenting={this.toggleComment}
                  />
                )
              }
              { commenting && (
                <ConnectedCommentEditor
                  commentId={comment.parent || comment.id}
                  {...this.props}
                  cancelListener={this.toggleComment}
                  initialValue={this.state.author}
                />
              ) }
            </div>
          </div>
          {!comment.parent && <Divider />}
        </div>
      </>
    );
  }
}

Comment.defaultProps = {
  toggleComment: null,
};

Comment.propTypes = {
  toggleComment: PropTypes.func,
  deleteComment: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => bindActionCreators({
  deleteComment: deleteCommentAction,
}, dispatch);

export default connect(null, mapDispatchToProps)(Comment);
