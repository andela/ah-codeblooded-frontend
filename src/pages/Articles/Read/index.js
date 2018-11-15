import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from '../../../containers/NavBar';
import ArticleEditor from '../../../components/ArticleEditor';
import Divider from '../../../components/Divider';
import ArticleProfileView from '../../../components/ArticleProfileView';
import CreateUpdate from '../CreateUpdate';
import ROUTES from '../../../utils/routes';
import './Read.scss';
import { getCurrentUser } from '../../../utils/auth';
import { ErrorPage } from '../../ErrorPage';
import LikeDislike from '../../../containers/LikeDislike';


class Read extends Component {
  renderEditButton = () => {
    const { article: { slug }, article: { author } } = this.props;
    const user = getCurrentUser();
    return (
      user && (author.username === user.username) ? (
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


  updateArticle = () => {
    const {
      article, match: { path }, errorFetching,
    } = this.props;
    if (!article.published || path === ROUTES.articles.update) {
      if (getCurrentUser()) {
        return <CreateUpdate {...this.props} />;
      } if (errorFetching) {
        return (
          <ErrorPage
            errorCode={404}
            errorMessage="The article you are looking for does not exist"
          />
        );
      }
    }
    return null;
  };

  render() {
    const { article } = this.props;
    return (
      this.updateArticle() || (
      <div>
        <NavBar />
        <div style={{ marginTop: '50px' }} className="container">
          <ArticleProfileView article={article} user={getCurrentUser()} />
          <Divider />
          <div className="row">
            <div className="col s12 m8 offset-m2">
              <ArticleEditor {...this.props} readOnly />
              {this.renderTags(article.tags)}
              <LikeDislike slug={article.slug} />
            </div>
          </div>
        </div>
        {this.renderEditButton()}
      </div>
      ));
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
