import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from '../../../containers/NavBar';
import ArticleEditor from '../../../components/ArticleEditor';
import Divider from '../../../components/Divider';
import ArticleProfileView from '../../../components/ArticleProfileView';
import CreateUpdate from '../CreateUpdate';
import ROUTES from '../../../utils/routes';
import './Read.scss';


class Read extends Component {
  renderEditButton = () => {
    const { article: { slug }, article: { author }, user } = this.props;
    return (
      author.username === user.username ? (
        <div className="fixed-action-btn">
          <a
            className="btn-floating btn-large teal"
            href={`/articles/edit/${slug}`}
          >
            <i className="large material-icons">mode_edit</i>
          </a>
        </div>
      ) : null
    );
  };

  renderTags = tags => (
    <div className="row tags">
      <div className="col">
        {
          tags.map(tag => (
            <div className="tag">{tag}</div>
          ))
        }
      </div>
    </div>
  );


  render() {
    const {
      user, article, match: { path },
    } = this.props;

    return (
      !article.published || path === ROUTES.articles.update ? <CreateUpdate {...this.props} /> : (
        <div>
          <NavBar />
          <div style={{ marginTop: '50px' }} className="container">
            <ArticleProfileView article={article} user={user} />
            <Divider />
            <ArticleEditor {...this.props} readOnly />
            {this.renderTags(article.tags)}
          </div>
          {this.renderEditButton()}
        </div>
      )
    );
  }
}

Read.propTypes = {
  history: PropTypes.shape({}).isRequired, // Add the actual shape --> key:value
  match: PropTypes.shape({}).isRequired,
  isSaving: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  user: PropTypes.shape().isRequired,
  articleEditor: PropTypes.shape({}).isRequired,
};

export default Read;