import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { MentionsInput, Mention } from 'react-mentions';
import { getCurrentUser } from '../../utils/auth';
import profile from '../../assets/images/profile.jpg';
import './CommentEditor.scss';
import styles, { mentionStyle } from './styles';
import PreLoader from '../../components/PreLoader';
import { commentAction, fetchCommentAuthorsAction, updateCommentAction } from './state/actions';


export class CommentEditor extends React.Component {
  inputField = React.createRef();

  state ={
    body: "",
    mentions: [],
    users: [],
  };

  constructor(props) {
    super(props);

    this.onInput = this.onInput.bind(this);
  }

  componentDidMount() {
    const { fetchAuthors, slug } = this.props;
    fetchAuthors(slug);
  }

  onInput(e, newValue, newPlainTextValue, mentions) {
    const truncated = [];
    mentions.forEach((mention) => {
      truncated.push(mention.display);
    });
    this.setState({ body: newValue, mentions: truncated });
  }

  handleSubmit = () => {
    const {
      slug, commentId, comment, update, updateComment, updateListener, authors,
    } = this.props;
    const { body, mentions } = this.state;
    if (body !== '') {
      if (update) {
        updateComment(slug, body, commentId, mentions, updateListener, authors);
      } else {
        comment(slug, body, commentId, mentions, () => {
          this.setState({ body: "" });
        });
      }
    }
  };

  componentWillReceiveProps = (nextProps) => {
    const { authors } = nextProps;
    const newUserList = [];
    authors.forEach((author) => {
      newUserList.push({ display: author.username, id: author.username });
    });

    this.setState({ users: newUserList, body: nextProps.initialValue });
  };

  renderInput = (isCommenting, update) => (
    <div className="input row">
      <div className="col s12">
        <MentionsInput
          value={this.state.body}
          onChange={this.onInput}
          style={styles}
          placeholder="Write a response..."
          inputRef={this.inputField}
          markup="@[__display__](__id__)"
        >
          <Mention
            trigger="@"
            data={this.state.users}
            style={mentionStyle}
            appendSpaceOnAdd
          />
        </MentionsInput>
      </div>
      <div className="col s12 row">
        <div className="col">
          <button
            className="btn-bordered"
            disabled={isCommenting}
            type="button"
            onClick={this.handleSubmit}
          >
            { update ? `Update` : `Comment`}
          </button>
        </div>
        <div className="col">
          {
            update
            && (
              <button
                className="btn-bordered"
                type="button"
                onClick={this.cancelEdit}
              >
                Cancel
              </button>
            )
          }
        </div>
      </div>
    </div>
  );

  cancelEdit = () => {
    this.props.cancelListener();
  };

  render() {
    const user = getCurrentUser() || this.props.user;
    const { isCommenting, update, cancelListener } = this.props;
    return (
      <div className="row comment-input" id="commentInput">
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="col row s10 valign-wrapper">
                <div className="col">
                  <img src={(user && user.image) || profile} alt="" className="circle profile" />
                </div>
                <div className="col username">{ user.username }</div>
              </div>
              {
                cancelListener
                && (
                <div className="col right">
                  <button className="btn btn-flat white close" type="button" onClick={cancelListener}>
                    <i className="material-icons grey-text">close</i>
                  </button>
                </div>
                )
              }
              { isCommenting && <PreLoader horizontal /> }
              { this.renderInput(isCommenting, update)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentEditor.defaultProps = {
  commentId: null,
  initialValue: "",
  update: false,
  updateListener: null,
  cancelListener: null,
  user: getCurrentUser(),
};

CommentEditor.propTypes = {
  isCommenting: PropTypes.bool.isRequired,
  commentId: PropTypes.number,
  comment: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  update: PropTypes.bool,
  updateListener: PropTypes.func,
  authors: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  user: PropTypes.shape(),
  fetchAuthors: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  cancelListener: PropTypes.func,
};

const mapStateToProps = ({ commenting }) => commenting;

const mapDispatchToProps = dispatch => bindActionCreators({
  comment: commentAction,
  fetchAuthors: fetchCommentAuthorsAction,
  updateComment: updateCommentAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditor);
