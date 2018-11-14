import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from '../../../containers/NavBar';
import ArticleEditor from '../../../components/ArticleEditor';
import { getArticleAction, saveArticleAction } from '../state/actions';
import Read from '../Read';
import ROUTES from '../../../utils/routes';
import { ErrorPage } from '../../ErrorPage';
import { getCurrentUser } from '../../../utils/auth';


class CreateUpdate extends Component {
  componentWillMount = () => {
    const { match: { params: { slug } }, getArticle } = this.props;
    if (slug !== 'new') {
      getArticle(slug);
    }
  };

  renderSaving = () => {
    const { isSaving, isSaved, match: { params: { slug } } } = this.props;
    if (slug === 'new' && isSaved) {
      return null;
    }
    const savedText = isSaved ? 'All changes saved...' : 'Changes not saved';
    return (
      <span className={`${isSaved || isSaving ? 'grey-text' : 'red-text'} text-darken-3`}>{isSaving ? 'Saving...' : savedText}</span>
    );
  };

  renderPublishButton = () => (
    <button className="btn btn-flat white pink-text dropdown-trigger" data-target="publish-article" type="button">Publish</button>
  );

  error404 = () => (
    <ErrorPage errorCode={404} errorMessage="The article you are looking for was not found" />
  );


  readArticle = () => {
    const { article, update } = this.props;
    if (article.published && !update) {
      return <Read {...this.props} />;
    }
    return null;
  };

  render() {
    const {
      article, match: { path }, isPageLoading, errorFetching,
    } = this.props;
    const update = path === ROUTES.articles.update;
    const user = getCurrentUser();
    if (!user || (errorFetching || (update && article.author.username !== user.username))) {
      return this.error404();
    }
    return (
      this.readArticle() || (
        <div>
          <NavBar
            isPageLoading={isPageLoading}
            left={this.renderSaving()}
            right={this.renderPublishButton()}
          />
          <div style={{ marginTop: '50px' }} className="container">
            <ArticleEditor
              {...this.props}
              update={update}
            />
          </div>
        </div>
      )
    );
  }
}


CreateUpdate.propTypes = {
  history: PropTypes.shape({}).isRequired, // Add the actual shape --> key:value
  match: PropTypes.shape({}).isRequired,
  isSaving: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  user: PropTypes.shape().isRequired,
  saveArticle: PropTypes.shape().isRequired,
  article: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ article, pageProgress }) => ({ ...article, ...pageProgress });

const mapDispatchToProps = dispatch => bindActionCreators({
  getArticle: getArticleAction,
  saveArticle: saveArticleAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdate);
