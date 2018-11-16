import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from '../../../containers/NavBar';
import ArticleEditor from '../../../components/ArticleEditor';
import { getArticleAction, saveArticleAction } from '../state/actions';
import { ErrorPage } from '../../ErrorPage';
import { getCurrentUser } from '../../../utils/auth';
import { ArticlePropTypes } from '../Create';


class Update extends Component {
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

  checkErrors = (article, isFetching) => {
    const user = getCurrentUser();
    if (!isFetching) {
      if (!user || article.author.username !== user.username) {
        return this.error404();
      }
    }
    return null;
  };

  render() {
    const { isPageLoading, article, isFetching } = this.props;
    return this.checkErrors(article, isFetching) || (
      <div>
        <NavBar
          isPageLoading={isPageLoading}
          left={this.renderSaving()}
          right={this.renderPublishButton()}
        />
        <div style={{ marginTop: '50px' }} className="container">
          <ArticleEditor
            {...this.props}
            update
          />
        </div>
      </div>
    );
  }
}


Update.propTypes = ArticlePropTypes;

const mapStateToProps = ({ article, pageProgress }) => ({ ...article, ...pageProgress });

const mapDispatchToProps = dispatch => bindActionCreators({
  getArticle: getArticleAction,
  saveArticle: saveArticleAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Update);
