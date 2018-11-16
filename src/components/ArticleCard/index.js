import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import truncate from 'truncate';
import placeholder from '../../assets/images/placeholder.jpg';
import layouts from './layouts';
import './ArticleCard.scss';
import readTime from '../../utils/readTime';
import { getCurrentUser } from '../../utils/auth';


class ArticleCard extends React.Component {
  horizontalReverseLayout = () => (
    <div className="horizontal reverse">
      <div className="col info-segment">
        {this.authorInfo()}
        {this.articleInfo()}
      </div>
      {this.articleImage()}
    </div>
  );

  horizontalLayout = () => (
    <div className="horizontal">
      {this.articleImage()}
      <div className="col info-segment">
        {this.authorInfo()}
        {this.articleInfo()}
      </div>
    </div>
  );

  verticalLayout = () => (
    <div className="vertical">
      {this.authorInfo()}
      {this.articleImage()}
      {this.articleInfo()}
    </div>
  );

  minimalLayout = () => (
    <div className="horizontal minimal">
      <div className="info-segment">
        {this.articleInfo()}
      </div>
    </div>
  );

  minimalAuthorLayout = () => (
    <div className="article-content horizontal minimal">
      <div className="info-segment">
        {this.authorInfo()}
        {this.articleInfo()}
      </div>
    </div>
  );

  articleImage = () => {
    const { article } = this.props;
    return (
      <div className="image-segment">
        <img src={article.image || placeholder} alt="" className="article-image" />
      </div>
    );
  };

  articleInfo = () => {
    const { article } = this.props;
    return (
      <div>
        <div className="article-title">{article.title}</div>
        <div className="read-time meta">{readTime(article.read_time)}</div>
        <div className="description">{truncate(article.description, 150, {})}</div>
      </div>
    );
  };

  authorInfo = () => {
    const { article } = this.props;
    return (
      <div className="author">
        <img src={article.author.image || placeholder} alt="" className="profile circle img" />
        <div className="info">
          <div className="username">{article.author && article.author.username}</div>
          <div className="date meta">
            <Moment fromNow interval={30000}>
              {article.created_at}
            </Moment>
          </div>
        </div>
      </div>
    );
  };

  getLink = (article) => {
    const user = getCurrentUser();
    if (article.published) {
      return `/article/@${article.author.username}/${article.slug}`;
    } if (!article.published && user && article.author.username === user.username) {
      return `/articles/edit/${article.slug}`;
    }
    return '#';
  };

  render() {
    const {
      layout, article, divided, bordered,
    } = this.props;
    const layoutMapping = {
      [layouts.VERTICAL_LAYOUT]: this.verticalLayout,
      [layouts.HORIZONTAL_LAYOUT]: this.horizontalLayout,
      [layouts.MINIMAL_LAYOUT]: this.minimalLayout,
      [layouts.MINIMAL_AUTHOR_LAYOUT]: this.minimalAuthorLayout,
      [layouts.HORIZONTAL_REVERSE_LAYOUT]: this.horizontalReverseLayout,
    };
    return (
    <>
      <a href={this.getLink(article)} className="article-card">
        <div className={`article-content ${bordered ? ` bordered` : (divided && ` separated`)}`}>
          {layoutMapping[layout]()}
        </div>
      </a>
    </>
    );
  }
}

ArticleCard.defaultProps = {
  layout: layouts.HORIZONTAL_LAYOUT,
  divided: false,
  bordered: false,
};

ArticleCard.propTypes = {
  layout: PropTypes.string,
  article: PropTypes.shape({}).isRequired,
  bordered: PropTypes.bool,
  divided: PropTypes.bool,
};
export default ArticleCard;
