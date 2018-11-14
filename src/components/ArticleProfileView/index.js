import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import readTime from '../../utils/readTime';
import profile from '../../assets/images/profile.jpg';
import './ArticleProfileView.scss';
import placeholder from '../../assets/images/placeholder.jpg';
import { getCurrentUser } from '../../utils/auth';

class ArticleProfileView extends React.Component {
  renderHeader = article => (
    <div className="col s12">
      <h2>{article.title}</h2>
      <br />
      <h5 className="grey-text">{readTime(article.read_time)}</h5>
      <h6 className="grey-text">
        {article.description}
      </h6>
    </div>
  );

  renderAuthor = (article, user) => (
    <div className=" col row valign-wrapper">
      <div className="col">
        <img
          src={article.author.image || (user && user.image) || profile}
          alt=""
          className="circle responsive-img profile"
        />
      </div>
      <div className="col">
        <div className="row">
          <div className="col">
            <h6>
              {article.author.username || (user && user.username)}
            </h6>
            <span className="grey-text meta">
              <Moment fromNow interval={30000}>
                {article.created_at}
              </Moment>
            </span>
          </div>
          {
            this.renderFollowButton(article, user)
                }
        </div>
      </div>
    </div>
  );

  renderFollowButton = (article, user) => (
    user && (article.author.username !== user.username) ? (
      <div className="col">
        <button className="btn small" type="button">
          Follow
        </button>
      </div>
    ) : null
  );

  render() {
    const { article } = this.props;
    const user = getCurrentUser();
    return (
      <div className="col l10 s12 offset-l1">
        <div className="row article">
          <div className="col s12 m6 valign-wrapper">
            <div className="row">
              {this.renderHeader(article)}
              {this.renderAuthor(article, user)}
            </div>
          </div>
          <div className="col s12 m6">
            <img
              src={article.image || placeholder}
              alt=""
              className="responsive-img banner"
            />
          </div>
        </div>
      </div>
    );
  }
}

ArticleProfileView.propTypes = {
  article: PropTypes.shape().isRequired,
};

export default ArticleProfileView;
