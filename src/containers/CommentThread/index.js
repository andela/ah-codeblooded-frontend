import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ConnectedComment from '../Comment/index';
import { fetchCommentsAction } from './state/actions';
import PreLoader from '../../components/PreLoader';


export class CommentThread extends React.Component {
  state = {
    page: 1,
  };

  componentWillMount = () => {
    const { parentId, slug, fetchComments } = this.props;
    fetchComments(slug, parentId);
  };

  renderComments = (results, comments, slug, startCommenting) => (
    <div>
      {
        results.map(comment => (
          <ConnectedComment
            comment={comment}
            slug={slug}
            toggleComment={startCommenting}
          />
        ))
      }
      <div>
        {
          comments.links && comments.links.next
            && this.loadMoreComments(comments)
        }
      </div>
    </div>
  );

  loadMoreComments = (comments) => {
    const { isFetchingMore } = comments;
    return (isFetchingMore ? <PreLoader />
      : (
        <button
          className="btn btn-flat fetchMore"
          type="button"
          onClick={this.fetchMoreComments}
        >
      Load more
        </button>
      ));
  };

  fetchMoreComments = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    const { parentId, slug, fetchComments } = this.props;
    fetchComments(slug, parentId, page + 1);
  };

  render() {
    const { slug, parentId, startCommenting } = this.props;

    let comments;
    if (parentId) {
      comments = this.props.threads[parentId];
    } else {
      comments = this.props;
    }

    if (!comments) {
      return '';
    }
    const { results } = comments;

    return results
      ? this.renderComments(results, comments, slug, startCommenting)
      : <PreLoader />;
  }
}

CommentThread.defaultProps = {
  parentId: null,
  startCommenting: null,
};

CommentThread.propTypes = {
  fetchComments: PropTypes.func.isRequired,
  parentId: PropTypes.number,
  startCommenting: PropTypes.func,
  slug: PropTypes.string.isRequired,
  threads: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ comments }) => comments;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchComments: fetchCommentsAction,
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(CommentThread);
